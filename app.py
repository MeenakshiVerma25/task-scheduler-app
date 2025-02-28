from flask import Flask, render_template, request

app = Flask(__name__)

class Task:
    def __init__(self, id, deadline, profit):
        self.id = id
        self.deadline = deadline
        self.profit = profit

def task_scheduler_with_deadlines(tasks, max_deadline):
    tasks.sort(key=lambda x: x.profit, reverse=True)  # Sort by profit (desc)
    schedule = [-1] * (max_deadline + 1)  # Empty slots
    total_profit = 0

    for task in tasks:
        for slot in range(min(task.deadline, max_deadline), 0, -1):
            if schedule[slot] == -1:  # Slot available
                schedule[slot] = task.id
                total_profit += task.profit
                break

    return schedule, total_profit

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            task_data = request.form.get("tasks")
            max_deadline = int(request.form.get("max_deadline"))
            tasks = []

            # Parse input tasks
            for line in task_data.split("\n"):
                id, deadline, profit = map(int, line.split(","))
                tasks.append(Task(id, deadline, profit))

            schedule, total_profit = task_scheduler_with_deadlines(tasks, max_deadline)
            scheduled_tasks = [t for t in schedule if t != -1]

            return render_template(
                "result.html",
                scheduled_tasks=scheduled_tasks,
                total_profit=total_profit,
            )
        except Exception as e:
            return f"Error: {e}"

    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

