// app/components/ChatMessage.tsx
type ChatMessageProps = {
    role: 'user' | 'ai'
    content: string
  }
  
  export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === 'user'
  
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-xs p-3 rounded-lg shadow-md ${
            isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
          }`}
        >
          {content}
        </div>
      </div>
    )
  }
  