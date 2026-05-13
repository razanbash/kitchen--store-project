CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    role VARCHAR(20)
);

CREATE TABLE kitchens (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price INTEGER,
    image TEXT
);

UPDATE users 
SET role = 'manager'
WHERE ID = 7;







CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
	user_id INTEGER,
	message TEXT,
	status 	VARCHAR DEFAULT 'pending'
)



UPDATE users
SET role = 'moderator'
WHERE email = 'mod@gmail.com'

UPDATE users 
SET ROLE = 'manager'
WHERE email = 'roma@gmail.com'


SELECT * FROM reservations;

ALTER TABLE reservations
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

DROP TABLE reservations;

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  kitchen_id INTEGER REFERENCES kitchens(id),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);


SELECT * FROM users;

DELETE FROM users
WHERE id = 2;



SELECT * FROM kitchens;

DELETE FROM kitchens;

SELECT * FROM kitchens WHERE id = 33;


TRUNCATE TABLE kitchens RESTART IDENTITY;



ALTER TABLE kitchens
ADD COLUMN category VARCHAR(50);


UPDATE kitchens
SET category = 'Modern'
WHERE category IS NULL;

UPDATE kitchens
SET category = 'Luxury'
WHERE name = 'Marble Luxury Kitchen';

UPDATE kitchens
SET category = 'Minimal'
WHERE name = 'Minimal White Kitchen';

UPDATE kitchens
SET category = 'Classic'
WHERE name = 'Classic Wooden Kitchen';

UPDATE kitchens
SET category = 'Modern'
WHERE name = 'Modern Wood Kitchen';

UPDATE kitchens
SET category = 'Modern'
WHERE name = 'Ultra Minimal Kitchen';


SELECT name, category FROM kitchens;



INSERT INTO kitchens (name, description, price, image) VALUES

('Modern Wood Kitchen', 'Warm wooden finish with clean modern design', 5400, 'https://i.pinimg.com/1200x/6e/9f/14/6e9f143f7b2902364bd08445a17c32ac.jpg'),

('Marble Luxury Kitchen', 'Elegant marble surfaces with premium feel', 4200, 'https://i.pinimg.com/736x/c8/f5/07/c8f507d3b132a1a548fb3592fe42cd87.jpg'),

('Minimal White Kitchen', 'Simple white design with clean lines', 2500, 'https://i.pinimg.com/1200x/76/e2/6a/76e26a370868d3f622764c6ca32efcc7.jpg'),

('Classic Wooden Kitchen', 'Traditional wooden kitchen with rich textures', 2800, 'https://i.pinimg.com/736x/cf/d5/4e/cfd54ef78d3931c3482ef64d50d15a2e.jpg'),

('Industrial Kitchen', 'Modern industrial style with metal and stone', 3200, 'https://i.pinimg.com/1200x/d1/91/e7/d191e7b2c3185d5d428190c9d96aad73.jpg'),

('Black Matte Kitchen', 'Elegant black matte finish for modern homes', 5000, 'https://i.pinimg.com/736x/bd/96/c0/bd96c0b90bb40e09519e19fc04ad0ec1.jpg'),

('Glass Style Kitchen', 'Glossy glass cabinets with modern touch', 6100, 'https://i.pinimg.com/1200x/b6/fe/99/b6fe993a3504c97aa8bbf004658dea26.jpg'),

('Rustic Kitchen', 'Cozy rustic design with natural wood elements', 4700, 'https://i.pinimg.com/1200x/32/a6/9f/32a69f73604078f310da21b0329e5d0a.jpg'),

('Luxury Gold Kitchen', 'Premium kitchen with gold accents', 4300, 'https://i.pinimg.com/736x/f6/53/97/f65397fa926ff02fa41baeb09ead9290.jpg'),

('Small Space Kitchen', 'Smart kitchen design for small spaces', 6100, 'https://i.pinimg.com/736x/8b/93/e7/8b93e745276d7709dc6d6824b7616671.jpg'),

('Open Concept Kitchen', 'Spacious open kitchen with island', 3800, 'https://i.pinimg.com/736x/d6/d6/82/d6d682f71a94a4f2295b0229a63d3212.jpg'),

('Grey Modern Kitchen', 'Stylish grey tones with modern finish', 2900, 'https://i.pinimg.com/736x/87/af/f3/87aff35c01b02668b19ff6bced39b0f2.jpg'),

('High Gloss Kitchen', 'Shiny high gloss cabinets for luxury feel', 7500, 'https://i.pinimg.com/736x/e7/f5/ce/e7f5ce71d3b300d3e17d33577dadcbad.jpg'),

('Dark Wood Kitchen', 'Deep wood tones with elegant style', 6900, 'https://i.pinimg.com/736x/be/87/bc/be87bc6fcb348ebd52c1fa9ce3a7ba51.jpg'),

('Italian Style Kitchen', 'Inspired by Italian modern kitchens', 3100, 'https://i.pinimg.com/736x/ad/b3/38/adb338588f23ecc6d65149fd739707b1.jpg'),

('Eco Friendly Kitchen', 'Sustainable materials and green design', 5100, 'https://i.pinimg.com/1200x/13/56/de/1356de59fe0cc5dcea4217f68e228df2.jpg'),

('Luxury White Marble', 'Bright marble kitchen with premium look', 4400, 'https://i.pinimg.com/736x/d2/c6/15/d2c615eff996ba1f97e999c1079bb13b.jpg'),

('Modern Black & White', 'Contrast black and white design', 6100, 'https://i.pinimg.com/736x/ba/bf/d2/babfd2ed1f75c6082d35d3f211a8534f.jpg'),

('Smart Tech Kitchen', 'Kitchen with integrated smart technology', 8100, 'https://i.pinimg.com/736x/5c/de/7c/5cde7c05f83f37ebab2d7f5a6af8fcef.jpg'),

('Scandinavian Kitchen', 'Light wood and white tones inspired by Nordic design', 8620, 'https://i.pinimg.com/736x/b1/63/d4/b163d49748de291c5610973b812da34a.jpg'),

('Luxury Island Kitchen', 'Large island kitchen with modern appliances', 5500, 'https://i.pinimg.com/1200x/06/33/1e/06331e3fa2a5d4a936229e99ec4de8bb.jpg'),

('Concrete Style Kitchen', 'Urban concrete finish for modern homes', 7100, 'https://i.pinimg.com/736x/e5/01/08/e50108f3de0af381b5cf962c4ddfa238.jpg'),

('Vintage Kitchen', 'Retro kitchen style with classic elements', 5300, 'https://i.pinimg.com/736x/80/73/fe/8073fea6f068729c674c8873630d1714.jpg'),

('Ultra Minimal Kitchen', 'Extreme minimal design with hidden storage', 49, 'https://i.pinimg.com/736x/44/65/71/44657153fbccc40148f13510ec7e27f5.jpg');
