import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

# This is our token limit warning threshold
MAX_MESSAGES = 6  # In real life this would be based on token count

conversation_history = []
summary = None

def get_summary(history):
    print("\n  📦 Conversation getting long — summarising old messages...\n")
    
    history_text = "\n".join([
        f"{msg['role'].upper()}: {msg['content']}" 
        for msg in history
    ])
    
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="You are a summarisation assistant. Summarise the following conversation in 3 to 5 sentences, keeping all important facts and context. Plain text only.",
        messages=[
            {"role": "user", "content": f"Summarise this conversation:\n{history_text}"}
        ]
    )
    
    return response.content[0].text

def chat(user_input):
    global conversation_history, summary

    # Check if conversation is getting too long
    if len(conversation_history) >= MAX_MESSAGES:
        summary = get_summary(conversation_history)
        conversation_history = []  # Clear the history
        print(f"  ✅ Summary saved. Starting fresh with context.\n")

    # Build messages — inject summary if we have one
    messages = []
    if summary:
        messages.append({
            "role": "user",
            "content": f"Here is a summary of our conversation so far: {summary}"
        })
        messages.append({
            "role": "assistant",
            "content": "Understood, I have the context from our previous conversation."
        })

    # Add current history and new message
    messages += conversation_history
    messages.append({"role": "user", "content": user_input})

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="You are a helpful assistant. Plain text only, no markdown.",
        messages=messages
    )

    assistant_reply = response.content[0].text

    # Update history
    conversation_history.append({"role": "user", "content": user_input})
    conversation_history.append({"role": "assistant", "content": assistant_reply})

    return assistant_reply

print("Chat with Claude! (context management enabled)")
print(f"History will auto-summarise every {MAX_MESSAGES} messages")
print("Type 'quit' to exit")
print("----------------------------------------------------------")

while True:
    user_input = input("\nYou: ")
    if user_input.lower() == "quit":
        break
    
    reply = chat(user_input)
    print(f"Claude: {reply}")
    print(f"  [Messages in memory: {len(conversation_history)}]")