CREATE TABLE files (
    id serial NOT NULL,
    filename varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE marks (
    file_id integer NOT NULL,
    mark integer,
    message varchar(255),
    CONSTRAINT fk_file_id
      FOREIGN KEY(file_id) 
	  REFERENCES files(id)
);
