# encoding: utf-8
class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.string :message
      t.integer :user_id, default: 0
      t.timestamps
    end
  end
end
