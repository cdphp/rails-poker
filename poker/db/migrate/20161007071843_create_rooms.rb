class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.integer :owner_id, default: 0
      t.boolean :lock, default: false
      t.string :subject, default: '', null: true
      t.timestamps
    end
  end
end
