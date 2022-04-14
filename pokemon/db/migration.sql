DO $$
	BEGIN
		IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = N'card')
   			THEN CREATE TABLE card
				(id int primary key,
				cardid varchar);
				COPY card
					FROM '/docker-entrypoint-initdb.d/output.csv'
					DELIMITER ','
					CSV HEADER;
  		END IF;
 	END; 
$$;