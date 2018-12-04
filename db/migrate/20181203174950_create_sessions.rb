class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'pgcrypto'
    create_table :sessions, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :user, foreign_key: true
      t.uuid :refresh_token
      t.datetime :expire_at
      t.timestamps
    end
    add_index :sessions, :refresh_token
  end
end
