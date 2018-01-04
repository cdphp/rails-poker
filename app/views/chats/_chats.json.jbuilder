json.chats chats do |message|
  json.id message.id
  json.message message.display_message
  json.user display_user(message)
  json.type message.chat_type
end
if defined?(me)
  json.who me[:id]
  json.ami me[:name]
end
