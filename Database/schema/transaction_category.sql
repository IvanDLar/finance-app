CREATE SEQUENCE category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE TransactionCategory (
    "id" INTEGER PRIMARY KEY DEFAULT nextval('category_id_seq').
    "name" TEXT NOT NULL,
);