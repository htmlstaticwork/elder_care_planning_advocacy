import os
import re

directory = r"c:\slot 4\nxt 7\Elder Care Planning Website"

# 1. Update navigation links in all files (except dashboards)
html_files = [
    "index.html", "home2.html", "services.html", "care-plans.html", "about.html", "contact.html"
]

for file in html_files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_links = '<a href="user-dashboard.html">User Dashboard</a>\n        <a href="admin-dashboard.html">Admin Dashboard</a>'
    content = content.replace('<a href="dashboard.html">Dashboard</a>', new_links)
    content = content.replace('<a href="dashboard.html" class="active">Dashboard</a>', '<a href="user-dashboard.html" class="active">User Dashboard</a>\n        <a href="admin-dashboard.html">Admin Dashboard</a>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 2. Update app.js
appjs_path = os.path.join(directory, "app.js")
if os.path.exists(appjs_path):
    with open(appjs_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("window.location.href = 'dashboard.html'", "window.location.href = 'user-dashboard.html'")
    with open(appjs_path, 'w', encoding='utf-8') as f:
        f.write(content)

# 3. Handle dashboards
dashboard_path = os.path.join(directory, "dashboard.html")
with open(dashboard_path, 'r', encoding='utf-8') as f:
    dash_content = f.read()

# Update the sidebar links in both
sidebar_old = '<a href="dashboard.html" class="active"><span class="nav-icon">📊</span> Dashboard</a>'
sidebar_new = '''<a href="user-dashboard.html" class="active"><span class="nav-icon">👤</span> User Dashboard</a>
        <a href="admin-dashboard.html"><span class="nav-icon">🛡️</span> Admin Dashboard</a>'''
sidebar_new_admin = '''<a href="user-dashboard.html"><span class="nav-icon">👤</span> User Dashboard</a>
        <a href="admin-dashboard.html" class="active"><span class="nav-icon">🛡️</span> Admin Dashboard</a>'''

user_dash_content = dash_content.replace(sidebar_old, sidebar_new)
# 4. Save User Dashboard
with open(os.path.join(directory, "user-dashboard.html"), 'w', encoding='utf-8') as f:
    f.write(user_dash_content)

# 5. Create Admin Dashboard
admin_dash_content = dash_content.replace(sidebar_old, sidebar_new_admin)
admin_dash_content = admin_dash_content.replace('Welcome back, Surya 👋', 'Welcome back, Admin 👋')

# Replace stats
old_stats = """          <div class="dash-card animate">
            <div class="card-label">Total Care Plans</div>
            <div class="card-value">12</div>
            <div class="card-change">↑ 3 this month</div>
          </div>
          <div class="dash-card animate">
            <div class="card-label">Upcoming Appointments</div>
            <div class="card-value">5</div>
            <div class="card-change">Next: Tomorrow 10 AM</div>
          </div>
          <div class="dash-card animate">
            <div class="card-label">Active Tasks</div>
            <div class="card-value">28</div>
            <div class="card-change">7 due today</div>
          </div>"""

new_stats = """          <div class="dash-card animate">
            <div class="card-label">Total Users</div>
            <div class="card-value">1,204</div>
            <div class="card-change">↑ 12% this month</div>
          </div>
          <div class="dash-card animate">
            <div class="card-label">Active Care Plans</div>
            <div class="card-value">845</div>
            <div class="card-change">↑ 5% this month</div>
          </div>
          <div class="dash-card animate">
            <div class="card-label">System Alerts</div>
            <div class="card-value">3</div>
            <div class="card-change" style="color:var(--accent);">Action required</div>
          </div>"""

admin_dash_content = admin_dash_content.replace(old_stats, new_stats)

old_activities_header = "<h3>Recent Activities</h3>"
old_activities = """            <div class="activity-item">
              <div class="activity-dot"></div>
              <div class="activity-text">
                <p>Updated medication schedule for Mom</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot info"></div>
              <div class="activity-text">
                <p>New care plan "Daily Routine" created</p>
                <span>5 hours ago</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot warning"></div>
              <div class="activity-text">
                <p>Appointment reminder: Dr. Patel - Cardiology</p>
                <span>Yesterday</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot"></div>
              <div class="activity-text">
                <p>Family member Priya joined the care team</p>
                <span>2 days ago</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot info"></div>
              <div class="activity-text">
                <p>Monthly health report generated</p>
                <span>3 days ago</span>
              </div>
            </div>"""

new_activities_header = "<h3>System Activities</h3>"
new_activities = """            <div class="activity-item">
              <div class="activity-dot"></div>
              <div class="activity-text">
                <p>New User Registration: john.doe@example.com</p>
                <span>10 mins ago</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot info"></div>
              <div class="activity-text">
                <p>System Backup Completed Successfully</p>
                <span>1 hour ago</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot warning"></div>
              <div class="activity-text">
                <p>Failed Login Attempt Detected (IP: 192.168.1.5)</p>
                <span>3 hours ago</span>
              </div>
            </div>"""

admin_dash_content = admin_dash_content.replace(old_activities_header, new_activities_header).replace(old_activities, new_activities)

with open(os.path.join(directory, "admin-dashboard.html"), 'w', encoding='utf-8') as f:
    f.write(admin_dash_content)

# Delete old dashboard.html
os.remove(dashboard_path)
print("Transformation successful.")
