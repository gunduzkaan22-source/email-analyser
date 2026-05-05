import anthropic
import json
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

client = anthropic.Anthropic()

# These are the actual functions Claude can choose to call
def save_to_file(filename, content):
    with open(filename, 'w') as f:
        f.write(content)
    return f"Successfully saved to {filename}"

def get_current_datetime():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def word_count(text):
    count = len(text.split())
    return f"Word count: {count} words"

# This tells Claude what tools exist and what they do
tools = [
    {
        "name": "save_to_file",
        "description": "Saves text content to a file on the computer",
        "input_schema": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "description": "The name of the file to save to"
                },
                "content": {
                    "type": "string",
                    "description": "The content to save"
                }
            },
            "required": ["filename", "content"]
        }
    },
    {
        "name": "get_current_datetime",
        "description": "Gets the current date and time",
        "input_schema": {
            "type": "object",
            "properties": {}
        }
    },
    {
        "name": "word_count",
        "description": "Counts the number of words in a piece of text",
        "input_schema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "The text to count words in"
                }
            },
            "required": ["text"]
        }
    }
]

def run_tool(tool_name, tool_input):
    print(f"  🔧 Claude is using tool: {tool_name}")
    if tool_name == "save_to_file":
        return save_to_file(tool_input["filename"], tool_input["content"])
    elif tool_name == "get_current_datetime":
        return get_current_datetime()
    elif tool_name == "word_count":
        return word_count(tool_input["text"])

# The conversation
messages = [
    {
        "role": "user",
        "content": "What is the current date and time? Then write a 3 sentence summary about Dubai and save it to dubai.txt. Finally tell me how many words that summary is."
    }
]

print("🤖 Running agent with tools...")
print("----------------------------------------------------------")

while True:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )

    if response.stop_reason == "tool_use":
        # Add Claude's full response to history
        messages.append({"role": "assistant", "content": response.content})

        # Collect ALL tool results in one go
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                tool_result = run_tool(block.name, block.input)
                print(f"  ✅ Result: {tool_result}\n")
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": tool_result
                })

        # Send ALL results back together
        messages.append({"role": "user", "content": tool_results})

    else:
        for block in response.content:
            if hasattr(block, "text"):
                print(f"\n🤖 Claude: {block.text}")
        break