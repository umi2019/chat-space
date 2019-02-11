json.user_name = @message.user.name
json.text = @message.body
json.date = @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")

