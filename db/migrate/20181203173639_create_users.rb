class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.string :recover_token
      t.datetime :recovered_at
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :users, :email
    add_index :users, :confirmation_token
    add_index :users, :recover_token
  end
end
