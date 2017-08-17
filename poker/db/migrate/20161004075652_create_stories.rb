# encoding: utf-8
class CreateStories < ActiveRecord::Migration[5.0]
  def change
    create_table :stories do |t|
      t.text :topic, null: false
      t.text :description
      t.integer :story_point
      t.integer :room_id, default: 0

      t.timestamps
    end
  end
end
