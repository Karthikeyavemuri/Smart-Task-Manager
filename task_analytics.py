import datetime

class TaskAnalytics:
    """
    A simple Python script demonstrating Object-Oriented Programming (OOP)
    and Data Structures (Lists, Dictionaries) to process task data.
    In a real-world scenario, this would connect to the MySQL/PostgreSQL DB.
    """
    def __init__(self):
        # Mocking data that would normally come from the database
        self.tasks = [
            {"id": 1, "title": "Finish Resume", "status": "Completed", "priority": "High"},
            {"id": 2, "title": "Learn Spring Boot", "status": "In Progress", "priority": "Medium"},
            {"id": 3, "title": "Build React UI", "status": "Pending", "priority": "High"},
            {"id": 4, "title": "Deploy to AWS", "status": "Pending", "priority": "Medium"},
            {"id": 5, "title": "Write Analytics Script", "status": "Completed", "priority": "Low"}
        ]

    def generate_report(self):
        print("="*50)
        print(f"   SMART TASK MANAGER - ANALYTICS REPORT")
        print(f"   Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*50)
        
        total_tasks = len(self.tasks)
        
        # Using Python dictionary and list comprehensions
        status_counts = {
            "Completed": sum(1 for t in self.tasks if t['status'] == 'Completed'),
            "In Progress": sum(1 for t in self.tasks if t['status'] == 'In Progress'),
            "Pending": sum(1 for t in self.tasks if t['status'] == 'Pending')
        }
        
        print(f"Total Tasks Overview:")
        print(f"  ✅ Completed:   {status_counts['Completed']}")
        print(f"  ⏳ In Progress: {status_counts['In Progress']}")
        print(f"  📝 Pending:     {status_counts['Pending']}")
        
        completion_rate = (status_counts['Completed'] / total_tasks) * 100 if total_tasks > 0 else 0
        print(f"\nProductivity Metric: {completion_rate:.1f}% Completion Rate")
        
        # Filtering high priority tasks
        high_priority_pending = [
            t['title'] for t in self.tasks 
            if t['priority'] == 'High' and t['status'] != 'Completed'
        ]
        
        if high_priority_pending:
            print("\n⚠️  ACTION REQUIRED: High Priority Unfinished Tasks!")
            for title in high_priority_pending:
                print(f"   -> {title}")
                
        print("="*50)

if __name__ == "__main__":
    analytics = TaskAnalytics()
    analytics.generate_report()
