json.array! @new_messages do |message|
  json.user_name  message.user.name
  json.text       message.body.to_s
  json.date       message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
  json.image      message.image.url.to_s
  json.id         message.id
end
