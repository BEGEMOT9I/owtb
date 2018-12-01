# README

* Ruby version
  
  MRI 2.4.2

* System dependencies

  RVM, NVM, ImageMagick

* Configuration

  Create ENV config file `cp .env.example .env.development`

  Edit .env.development with your configuration

* Database creation

  `rake db:create`

* Database initialization

  `rake db:seed`

* How to run

  `foreman start -f Procfile.dev`

  with hmr:

  `foreman start -f Procfile.dev-server`
