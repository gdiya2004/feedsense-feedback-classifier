def assign_priority(category):
    if category in ["Bug", "Billing Issue"]:
        return "High"
    elif category == "Feature Request":
        return "Medium"
    else:
        return "Low"
