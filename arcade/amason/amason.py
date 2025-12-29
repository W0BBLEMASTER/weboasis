# amason2.py - Async Port for WebOasis [PROTO8]
import js
import asyncio
import builtins

# --- Async IO Bridge ---
async def terminal_input(prompt=""):
    if prompt:
        print(prompt, end="")
    return await js.get_terminal_input()

builtins.input = terminal_input

# --- Game Data (UNCHANGED) ---
rooms = {
    'West of House': {
        'description': 'You are standing in an open field west of a weathered house, with a boarded front door.',
        'exits': {'north': 'North of House', 'east': 'Behind House'},
        'items': []
    },
    'North of House': {
        'description': 'You are on a path north of the house. The path continues north, or you can go south back to the west of the house.',
        'exits': {'south': 'West of House', 'north': 'Forest'},
        'items': []
    },
    'Behind House': {
        'description': 'You are behind the house. There is a small, overgrown garden here. A small, rusty key lies on the ground.',
        'exits': {'west': 'West of House'},
        'items': ['rusty key']
    },
    'Inside House': {
        'description': 'You are inside the house. It is dusty and smells of decay. The front door is now open.',
        'exits': {'south': 'West of House'},
        'items': []
    },
    'Forest': {
        'description': 'You are in a dark, foreboding forest. It is too dark to see any paths forward.',
        'exits': {'south': 'North of House'},
        'items': []
    }
}

current_room = 'West of House'
inventory = []
game_over = False

# --- Game Logic (UNCHANGED) ---
def display_room(room_name):
    room = rooms[room_name]
    print(f"\n--- {room_name} ---")
    print(room['description'])
    if room['items']:
        print("You see here: " + ", ".join(room['items']))
    exits = room['exits'].keys()
    if exits:
        print("Exits: " + ", ".join(exits))

def parse_command(command):
    parts = command.lower().split()
    if not parts:
        return None, None
    action = parts[0]
    target = " ".join(parts[1:]) if len(parts) > 1 else None
    return action, target

def handle_command(action, target):
    global current_room, inventory, game_over
    if action == 'exit':
        print("Goodbye!")
        game_over = True
        return
    if action == 'look':
        display_room(current_room)
        return
    if action == 'inventory' or action == 'i':
        if inventory:
            print("You are carrying: " + ", ".join(inventory))
        else:
            print("Your inventory is empty.")
        return
    if action == 'go':
        if target in rooms[current_room]['exits']:
            next_room_name = rooms[current_room]['exits'][target]
            if current_room == 'West of House' and target == 'east' and 'rusty key' not in inventory:
                print("The front door is boarded shut.")
            elif current_room == 'West of House' and target == 'east' and 'rusty key' in inventory:
                print("You use the rusty key to unboard the front door.")
                rooms['West of House']['exits']['east'] = 'Inside House'
                current_room = 'Inside House'
                display_room(current_room)
            else:
                current_room = next_room_name
                display_room(current_room)
        else:
            print("You can't go that way.")
        return
    if action == 'take' or action == 'get':
        if target in rooms[current_room]['items']:
            rooms[current_room]['items'].remove(target)
            inventory.append(target)
            print(f"You take the {target}.")
        else:
            print(f"You don't see a {target} here.")
        return
    if action == 'use':
        if target == 'rusty key' and 'rusty key' in inventory:
            if current_room == 'West of House':
                print("You use the rusty key to unboard the front door.")
                rooms['West of House']['exits']['east'] = 'Inside House'
            else:
                print("You can't use the rusty key here.")
        else:
            print("You don't have that item or can't use it here.")
        return
    print("I don't understand that command. Try 'go', 'take', 'use', 'look', 'inventory', or 'exit'.")

# --- Async Game Loop ---
async def main():
    global game_over
    print("Welcome to Zork-ish Adventure!")
    print("Type 'help' for commands, 'exit' to exit.")
    display_room(current_room)

    while not game_over:
        command = await builtins.input("> ")
        action, target = parse_command(command)
        if action:
            handle_command(action, target)

# Start Execution
asyncio.ensure_future(main())
