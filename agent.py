import anthropic
import json
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

def run_agent(goal):
    print(f"\n🎯 Goal: {goal}")
    print("----------------------------------------------------------")
    
    # Step 1: Ask Claude to make a plan
    planning_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system="You are a planning assistant. When given a goal, respond with a JSON object containing a 'plan' key with a list of 3 to 5 clear steps to achieve it. No markdown, pure JSON only.",
        messages=[
            {"role": "user", "content": f"Create a plan to achieve this goal: {goal}"}
        ]
    )
    
    raw = planning_response.content[0].text
    cleaned = raw.replace("```json", "").replace("```", "").strip()
    plan = json.loads(cleaned)
    
    steps = plan["plan"]
    print(f"\n📋 Plan created with {len(steps)} steps:")
    for i, step in enumerate(steps, 1):
        print(f"  {i}. {step}")
    
    # Step 2: Execute each step
    print("\n⚙️  Executing steps...\n")
    results = []
    
    for i, step in enumerate(steps, 1):
        print(f"  Running step {i}: {step}")
        
        step_response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=512,
            system="You are a helpful execution assistant. Complete the given step concisely in 2 to 3 sentences. Plain text only.",
            messages=[
                {"role": "user", "content": f"Complete this step: {step}"}
            ]
        )
        
        result = step_response.content[0].text
        results.append({"step": step, "result": result})
        print(f"  ✅ Done\n")
    
    # Step 3: Summarise everything
    summary_response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system="You are a summarisation assistant. Plain text only, no markdown.",
        messages=[
            {"role": "user", "content": f"Summarise what was accomplished: {json.dumps(results)}"}
        ]
    )
    
    print("----------------------------------------------------------")
    print("📊 FINAL SUMMARY:")
    print(summary_response.content[0].text)

# Run it!
goal = input("Enter your business goal: ")
run_agent(goal)