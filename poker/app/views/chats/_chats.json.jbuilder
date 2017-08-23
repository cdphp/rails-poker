json.chats chats do |message|
  json.id message.id
  json.message I18n.t(message.message, default: message.message)
  json.user display_user(message)
  json.type message.chat_type
end
if defined?(me)
  json.me me
end
