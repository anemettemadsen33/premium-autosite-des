import { Star, Trophy, Medal, Crown, Target, Fire, CheckCircle } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { UserGamification, BadgeType, Mission } from '@/lib/types'

const BADGE_CONFIG: Record<BadgeType, { icon: any, label: string, color: string, description: string }> = {
  'expert-poster': {
    icon: Star,
    label: 'Expert Poster',
    color: 'from-yellow-400 to-amber-500',
    description: '50+ anunțuri publicate'
  },
  'top-seller': {
    icon: Trophy,
    label: 'Top Seller',
    color: 'from-purple-400 to-pink-500',
    description: 'Top 10 dealeri luna aceasta'
  },
  'early-adopter': {
    icon: Crown,
    label: 'Early Adopter',
    color: 'from-blue-400 to-cyan-500',
    description: 'Utilizator din primele 100'
  },
  'verified-dealer': {
    icon: Medal,
    label: 'Dealer Verificat',
    color: 'from-green-400 to-emerald-500',
    description: 'Cont verificat KYC'
  },
  'community-helper': {
    icon: Fire,
    label: 'Community Helper',
    color: 'from-orange-400 to-red-500',
    description: '100+ ajutoare în comunitate'
  }
}

interface BadgeDisplayProps {
  badge: BadgeType
  size?: 'sm' | 'md' | 'lg'
}

export function BadgeDisplay({ badge, size = 'md' }: BadgeDisplayProps) {
  const config = BADGE_CONFIG[badge]
  const Icon = config.icon
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-3.5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`rounded-full bg-gradient-to-br ${config.color} ${sizeClasses[size]} flex items-center justify-center shadow-lg`}>
        <Icon className={`${iconSizes[size]} text-white`} weight="fill" />
      </div>
      {size !== 'sm' && (
        <div className="text-center">
          <p className="text-xs font-semibold">{config.label}</p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>
      )}
    </div>
  )
}

interface XPBarProps {
  xp: number
  level: number
}

export function XPBar({ xp, level }: XPBarProps) {
  const xpForNextLevel = level * 1000
  const xpProgress = (xp % xpForNextLevel) / xpForNextLevel * 100
  const nextLevelXP = xpForNextLevel - (xp % xpForNextLevel)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-sm">
            {level}
          </div>
          <span className="font-semibold">Level {level}</span>
        </div>
        <span className="text-muted-foreground">{nextLevelXP} XP până la Level {level + 1}</span>
      </div>
      <Progress value={xpProgress} className="h-3 bg-muted" />
      <div className="text-xs text-muted-foreground text-right">
        {xp % xpForNextLevel} / {xpForNextLevel} XP
      </div>
    </div>
  )
}

interface MissionCardProps {
  mission: Mission
  onClaim?: (missionId: string) => void
}

export function MissionCard({ mission, onClaim }: MissionCardProps) {
  const progress = (mission.progress / mission.target) * 100
  const isCompleted = mission.completed

  return (
    <Card className={`p-4 transition-all ${isCompleted ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900' : 'hover:shadow-md'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={mission.type === 'daily' ? 'default' : mission.type === 'weekly' ? 'secondary' : 'outline'}>
              {mission.type === 'daily' ? 'Zilnic' : mission.type === 'weekly' ? 'Săptămânal' : 'Achievement'}
            </Badge>
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />}
          </div>
          
          <div>
            <h4 className="font-semibold">{mission.title}</h4>
            <p className="text-sm text-muted-foreground">{mission.description}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progres: {mission.progress}/{mission.target}</span>
              <span className="font-medium text-accent">+{mission.xpReward} XP</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {mission.expiresAt && !isCompleted && (
            <p className="text-xs text-muted-foreground">
              Expiră: {new Date(mission.expiresAt).toLocaleDateString('ro-RO')}
            </p>
          )}
        </div>

        {isCompleted && onClaim && (
          <button
            onClick={() => onClaim(mission.id)}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm"
          >
            Revendică
          </button>
        )}
      </div>
    </Card>
  )
}

interface LeaderboardProps {
  users: Array<{
    id: string
    name: string
    avatar?: string
    xp: number
    level: number
    rank: number
  }>
  currentUserId?: string
}

export function Leaderboard({ users, currentUserId }: LeaderboardProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-amber-500" weight="fill" />
        <h3 className="text-xl font-bold">Clasament Săptămânal</h3>
      </div>

      <div className="space-y-2">
        {users.map((user, idx) => {
          const isCurrentUser = user.id === currentUserId
          const medalColors = ['text-amber-500', 'text-gray-400', 'text-orange-600']
          
          return (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isCurrentUser ? 'bg-accent/10 border-2 border-accent' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 font-bold">
                {idx < 3 ? (
                  <Trophy className={`w-6 h-6 ${medalColors[idx]}`} weight="fill" />
                ) : (
                  <span className="text-muted-foreground">#{user.rank}</span>
                )}
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{user.name} {isCurrentUser && '(Tu)'}</p>
                <p className="text-sm text-muted-foreground">Level {user.level}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent">{user.xp.toLocaleString()} XP</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

interface GamificationDashboardProps {
  gamification: UserGamification
  onClaimMission?: (missionId: string) => void
}

export function GamificationDashboard({ gamification, onClaimMission }: GamificationDashboardProps) {
  const dailyMissions = gamification.missions.filter(m => m.type === 'daily')
  const achievements = gamification.missions.filter(m => m.type === 'achievement')

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Profil & Progres</h3>
        
        <XPBar xp={gamification.xp} level={gamification.level} />

        <Separator />

        <div>
          <h4 className="font-semibold mb-3">Badge-uri Obținute</h4>
          <div className="flex gap-4 flex-wrap">
            {gamification.badges.length > 0 ? (
              gamification.badges.map(badge => (
                <BadgeDisplay key={badge} badge={badge} size="md" />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Niciun badge obținut încă</p>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">Misiuni Zilnice</h3>
        {dailyMissions.map(mission => (
          <MissionCard key={mission.id} mission={mission} onClaim={onClaimMission} />
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold">Achievements</h3>
        {achievements.map(mission => (
          <MissionCard key={mission.id} mission={mission} onClaim={onClaimMission} />
        ))}
      </div>
    </div>
  )
}
