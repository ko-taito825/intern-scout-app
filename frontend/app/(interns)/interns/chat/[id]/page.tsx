"use client";

import { chatMessage } from "@/app/_types/message";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
export default function page() {
  const params = useParams();
  const scoutedId = params.id;
  const router = useRouter();
  const [messages, setMessages] = useState<chatMessage[]>([]);
  const [partnerName, setPartnerName] = useState<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fetchMessages = async () => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error("ログイン状態が確認できません");
      router.push("/interns/new");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3001/api/scouts/${scoutedId}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
        },
      );
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error("メッセージの取得に失敗しました");
      console.error("メッセージの取得に失敗しました", error);
    }
  };
  const fetchPartnerName = async () => {
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error("ログイン状態が確認できません");
      router.push("/interns/new");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/api/scouts/${scoutedId}`, {
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userId || "",
        },
      });
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const data = await res.json();
      setPartnerName(data.partner_name);
    } catch (error) {
      toast.error("相手の名前の取得に失敗しました");
      console.error("相手の名前の取得に失敗しました", error);
    }
  };
  useEffect(() => {
    fetchMessages();
    fetchPartnerName();
  }, [scoutedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    const userId = localStorage.getItem("current_user_id");
    if (!userId) {
      toast.error("ログイン状態が確認できません");
      router.push("/interns/new");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch(
        `http://localhost:3001/api/scouts/${scoutedId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId || "",
          },
          body: JSON.stringify({ body: inputMessage }),
        },
      );
      if (!res.ok) {
        throw new Error("API通信に失敗しました");
      }
      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
    } catch (error) {
      toast.error("メッセージの送信に失敗しました");
      console.error("メッセージの送信に失敗しました", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="flex items-center border-b border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <Link
          href="/companies"
          className="mr-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
        >
          ←
        </Link>
        <div>
          <h2 className="font-bold text-zinc-900">
            {partnerName ? `${partnerName}` : "読み込み中..."}
          </h2>
          <p className="text-xs text-zinc-500">とのチャット</p>
        </div>
      </div>
      <main className="min-h-screen bg-gray-50 px-4 py-8 font-sans">
        <div className="mx-auto flex h-[80vh] max-w-2xl flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.length === 0 ? (
              <p className="text-center text-sm text-gray-400 mt-8">
                最初のメッセージを送ってみましょう！
              </p>
            ) : (
              messages.map((msg) => {
                const isMe = !msg.is_from_company;

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                        isMe
                          ? "bg-sky-500 text-white rounded-br-none"
                          : "bg-purple-500 text-white rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap wrap-break-word">
                        {msg.body}
                      </p>
                      <p
                        className={`mt-1 text-[10px] text-right ${
                          isMe ? "text-sky-100" : "text-purple-200"
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString("ja-JP", {
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-gray-100 p-4 bg-white rounded-b-2xl"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
