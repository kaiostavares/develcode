ALTER TABLE user_image DROP CONSTRAINT userImage_user_id_fkey;

ALTER TABLE user_image 
ADD CONSTRAINT userImage_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users (id) 
ON DELETE CASCADE 
ON UPDATE CASCADE;