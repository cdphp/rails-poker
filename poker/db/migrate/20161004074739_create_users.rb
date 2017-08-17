# encoding: utf-8
class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string  :display_name, null: false
      t.string :role, default: 'normal', null: false
      t.integer :qq, default: 0
      t.integer :priority, default: 0
      t.string :persistence_token

      t.timestamps
    end
  end
end
