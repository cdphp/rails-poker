class CreatePlays < ActiveRecord::Migration[5.0]
  def change
    create_table :plays do |t|
      t.string :user_id, null: false
      t.integer :story_point
      t.integer :room_id, null: false
      t.integer :story_id, null: false

      t.timestamps
    end
  end
end
