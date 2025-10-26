import { useKV } from '@github/spark/hooks'
import { Message, Conversation } from './types'

export function useMessages(userId: string | null) {
  const [messages, setMessages] = useKV<Message[]>('messages', [])
  
  const userMessages = messages?.filter(m => 
    m.senderId === userId || m.receiverId === userId
  ) || []
  
  const conversations: Conversation[] = []
  const conversationMap = new Map<string, Message[]>()
  
  userMessages.forEach(msg => {
    const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId
    const key = `${msg.listingId}-${otherUserId}`
    
    if (!conversationMap.has(key)) {
      conversationMap.set(key, [])
    }
    conversationMap.get(key)!.push(msg)
  })
  
  conversationMap.forEach((msgs, key) => {
    const sorted = msgs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const lastMessage = sorted[0]
    const unreadCount = sorted.filter(m => 
      m.receiverId === userId && !m.read
    ).length
    
    const [listingId, otherUserId] = key.split('-')
    
    conversations.push({
      id: key,
      listingId,
      participantIds: [userId!, otherUserId],
      lastMessage,
      unreadCount
    })
  })
  
  const sendMessage = (listingId: string, receiverId: string, content: string) => {
    if (!userId) return
    
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      listingId,
      senderId: userId,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
      read: false
    }
    
    setMessages(current => [...(current || []), newMessage])
    return newMessage
  }
  
  const markAsRead = (messageIds: string[]) => {
    setMessages(current => 
      (current || []).map(msg => 
        messageIds.includes(msg.id) ? { ...msg, read: true } : msg
      )
    )
  }
  
  const getConversationMessages = (listingId: string, otherUserId: string): Message[] => {
    if (!userId) return []
    
    return (messages || [])
      .filter(m => 
        m.listingId === listingId &&
        ((m.senderId === userId && m.receiverId === otherUserId) ||
         (m.senderId === otherUserId && m.receiverId === userId))
      )
      .sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }
  
  return {
    conversations: conversations.sort((a, b) => 
      new Date(b.lastMessage.createdAt).getTime() - 
      new Date(a.lastMessage.createdAt).getTime()
    ),
    sendMessage,
    markAsRead,
    getConversationMessages
  }
}
