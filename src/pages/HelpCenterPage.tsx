import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  MagnifyingGlass,
  Question,
  Sparkle,
  BookOpen,
  ChatCircleDots,
  CaretRight,
  ShoppingCart,
  Gavel,
  Calculator,
  Heart,
  User,
  Shield
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

type HelpCategory = {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  articles: Article[]
}

type Article = {
  id: string
  question: string
  answer: string
  popular?: boolean
}

type HelpCenterProps = {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function HelpCenterPage({ onNavigate }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="h-5 w-5" weight="duotone" />,
      color: 'bg-blue-500',
      articles: [
        {
          id: '1',
          question: 'How do I create an account?',
          answer: 'Click the "Register" button in the top navigation. Fill in your email, password, and basic information. Verify your email to activate your account.',
          popular: true
        },
        {
          id: '2',
          question: 'How do I post my first listing?',
          answer: 'After logging in, click "Add Listing" in the user menu. Select your vehicle category, fill in all required details, upload clear photos, and submit for review.',
          popular: true
        },
        {
          id: '3',
          question: 'How do I search for vehicles?',
          answer: 'Use the search bar in the navigation or visit a category page. Apply filters like brand, price range, mileage, year, and fuel type to narrow your results.'
        }
      ]
    },
    {
      id: 'buying',
      title: 'Buying Vehicles',
      icon: <ShoppingCart className="h-5 w-5" weight="duotone" />,
      color: 'bg-green-500',
      articles: [
        {
          id: '4',
          question: 'How do I purchase a vehicle?',
          answer: 'Click "Buy Now" on the listing detail page. Choose between outright purchase or financing. Fill in the required information and submit your application.',
          popular: true
        },
        {
          id: '5',
          question: 'What financing options are available?',
          answer: 'We offer various financing plans with flexible terms. Use our financing calculator to estimate monthly payments. Approval depends on credit assessment.'
        },
        {
          id: '6',
          question: 'Can I schedule a test drive?',
          answer: 'Yes! On the listing detail page, click "Schedule Test Drive". Choose your preferred date and time, and the seller will confirm availability.'
        },
        {
          id: '7',
          question: 'How do I get a vehicle history report?',
          answer: 'Click "Purchase Report" on any listing to get a comprehensive history including accidents, service records, and title status for €29.99.'
        }
      ]
    },
    {
      id: 'auctions',
      title: 'Auctions',
      icon: <Gavel className="h-5 w-5" weight="duotone" />,
      color: 'bg-orange-500',
      articles: [
        {
          id: '8',
          question: 'How do auctions work?',
          answer: 'Browse live auctions, place your bid before the countdown ends. You can set an auto-bid limit to automatically outbid others up to your maximum.',
          popular: true
        },
        {
          id: '9',
          question: 'What is auto-bidding?',
          answer: 'Auto-bidding automatically places bids on your behalf up to your maximum limit, ensuring you stay competitive without constant monitoring.'
        },
        {
          id: '10',
          question: 'What happens if I win an auction?',
          answer: 'You\'ll receive a confirmation email with payment instructions. Complete payment within 48 hours to secure your vehicle.'
        }
      ]
    },
    {
      id: 'selling',
      title: 'Selling Vehicles',
      icon: <User className="h-5 w-5" weight="duotone" />,
      color: 'bg-purple-500',
      articles: [
        {
          id: '11',
          question: 'How do I price my vehicle?',
          answer: 'Use our AI Price Prediction tool on your listing to get market-based pricing recommendations with confidence scores.'
        },
        {
          id: '12',
          question: 'How long does it take to sell?',
          answer: 'Average time varies by category and price. Use Market Insights to understand demand trends. Competitive pricing helps sell faster.'
        },
        {
          id: '13',
          question: 'Can I edit my listing after posting?',
          answer: 'Yes! Go to "My Listings" in your dashboard, find the listing, and click "Edit". Update any details and save changes.'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Features',
      icon: <Calculator className="h-5 w-5" weight="duotone" />,
      color: 'bg-cyan-500',
      articles: [
        {
          id: '14',
          question: 'How do I use the comparison tool?',
          answer: 'Click "Compare" on up to 3 vehicle cards. View them side-by-side with detailed specifications in the comparison page.',
          popular: true
        },
        {
          id: '15',
          question: 'What are saved searches?',
          answer: 'Save your filter combinations and get email alerts when new matching vehicles are listed. Manage them in "Saved Searches".'
        },
        {
          id: '16',
          question: 'How does the financing calculator work?',
          answer: 'Enter the vehicle price, down payment, interest rate, and loan term to calculate estimated monthly payments and total interest.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Security',
      icon: <Shield className="h-5 w-5" weight="duotone" />,
      color: 'bg-red-500',
      articles: [
        {
          id: '17',
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page. Enter your email to receive a reset link. Follow the link to create a new password.'
        },
        {
          id: '18',
          question: 'How do I update my profile?',
          answer: 'Go to your dashboard and click on your profile picture. Update your information and click "Save Changes".'
        },
        {
          id: '19',
          question: 'Is my payment information secure?',
          answer: 'Yes, all payment data is encrypted and processed through secure payment gateways. We never store complete card details.'
        }
      ]
    }
  ]

  const popularQuestions = categories
    .flatMap(cat => cat.articles.filter(a => a.popular))
    .slice(0, 5)

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(
      article =>
        article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0)

  const displayCategories = searchQuery ? filteredCategories : 
    selectedCategory ? categories.filter(c => c.id === selectedCategory) : categories

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Question className="h-8 w-8 text-accent" weight="duotone" />
          </div>
          <h1 className="text-4xl font-bold mb-3">How can we help you?</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Search our knowledge base or browse by category
          </p>

          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {!searchQuery && !selectedCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-all group"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`${category.color} text-white p-2 rounded-lg`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <CardDescription>
                            {category.articles.length} article{category.articles.length !== 1 ? 's' : ''}
                          </CardDescription>
                        </div>
                        <CaretRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && !selectedCategory && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkle className="h-5 w-5 text-accent" weight="duotone" />
                Popular Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularQuestions.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <CaretRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{article.question}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {(searchQuery || selectedCategory) && (
          <>
            {selectedCategory && (
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => setSelectedCategory(null)}
              >
                ← Back to all categories
              </Button>
            )}

            {displayCategories.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MagnifyingGlass className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try different keywords or browse categories
                  </p>
                  <Button onClick={() => setSearchQuery('')}>Clear search</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {displayCategories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`${category.color} text-white p-2 rounded-lg`}>
                          {category.icon}
                        </div>
                        <CardTitle>{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.articles.map((article, index) => (
                          <AccordionItem key={article.id} value={article.id}>
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center gap-2">
                                {article.question}
                                {article.popular && (
                                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground">{article.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        <Card className="mt-12 bg-gradient-to-br from-accent/10 to-purple-500/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <ChatCircleDots className="h-12 w-12 text-accent mx-auto mb-4" weight="duotone" />
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our AI-powered support chat is available 24/7 to answer your questions
            </p>
            <Button className="bg-gradient-to-r from-accent to-purple-600">
              <ChatCircleDots className="h-5 w-5 mr-2" weight="duotone" />
              Start Live Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
