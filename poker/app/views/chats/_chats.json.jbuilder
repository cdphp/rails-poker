json.chats chats do |message|
  json.id message.id
  json.message message.message
  json.user display_user(message)
end