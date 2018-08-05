USE creator_db;

INSERT INTO worlds (world_name, world_type, classification, life, intelligent_life, image_slug) 
VALUES  ('earth', 'planet', 'terrestrial', 1, 1, 'earth'),
        ('mars', 'planet', 'terrestrial', 0, 0, 'mars'),
        ('saturn', 'planet', 'gaseous', 0, 0, 'saturn'),
        ('neptune', 'planet', 'icy', 0, 0, 'neptune'),
        ('star_1234', 'star', 'star', 0, 0, 'star_1');