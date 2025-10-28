# MCD (Modèle Conceptuel de Données)

![MCD-GreenRoots](MCD2.excalidraw.png)

# MLD (Modèle Logique de Données)

USER (id, last_name, first_name, e-mail, password, role)<br>
USER_HAS_TREE (id, #user_id, #tree_id)<br>
ORDER (id, date, total_price, status, #user_id)<br>
ORDER_HAS_TREE (id, quantity, #tree_id, #order_id)<br>
TREE (id, name, description, image, price, stock, origin)<br>
PLANT (id, date, quantity, #tree_id, #place_id) <br>
PLACE (id, name)<br>

# MPD (Modèle Physique de Données)

```sql
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50)
);

CREATE TABLE user_has_tree (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    tree_id INT REFERENCES tree(id) ON DELETE CASCADE
);

CREATE TABLE place (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tree (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    origin VARCHAR(100),
    place_id INT REFERENCES place(id) ON DELETE SET NULL
);

CREATE TABLE plant (
    id SERIAL PRIMARY KEY,
    date_plantation DATE NOT NULL,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    tree_id INT NOT NULL REFERENCES tree(id) ON DELETE CASCADE,
    place_id INT NOT NULL REFERENCES place(id) ON DELETE CASCADE
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY, 
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE order_has_tree (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    tree_id INT REFERENCES tree(id) ON DELETE CASCADE NOT NULL,
    order_id INT REFERENCES "order"(id) ON DELETE CASCADE NOT NULL
);


```
