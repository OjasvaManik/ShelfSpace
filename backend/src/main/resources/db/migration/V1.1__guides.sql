CREATE TABLE guides (
                        id UUID PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        summary VARCHAR(255) NOT NULL,
                        description TEXT NOT NULL,
                        search_vector TSVECTOR,
                        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
                        updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE INDEX guides_search_vector_idx
    ON guides
        USING GIN (search_vector);

CREATE TRIGGER guides_search_vector_trigger
    BEFORE INSERT OR UPDATE ON guides
    FOR EACH ROW EXECUTE FUNCTION
    tsvector_update_trigger(
            search_vector,
            'pg_catalog.english',
            title, summary, description
    );

