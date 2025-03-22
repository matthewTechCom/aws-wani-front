"use client"

import ChatMessage from '@/app/(Chat)/components/ChatMessage'

type Props = {
  params: {
    id: string[]
  }
}

type Message = {
    id: number
    role: 'user' | 'ai'
    content: string
  }

const dummyMessages: Message[] = [
  { id: 1, role: 'user', content: 'こんにちは！' },
  { id: 2, role: 'ai', content: 'こんにちは、何かお手伝いできますか？' },
  { id: 3, role: 'user', content: 'おすすめの本は？' },
]

export default function ChatPage({ params }: Props) {
  const userId = params.id?.[0]

  return (
    <main className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="text-sm text-gray-500 mb-2">ユーザーID: {userId}</div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {dummyMessages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </div>

      <div className="mt-auto flex">
        <input
          type="text"
          placeholder="メッセージを入力..."
          className="flex-1 p-2 border rounded-l-md"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          送信
        </button>
      </div>
    </main>
  )
}
