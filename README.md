# Flask API dla Zarządzania Produktami 🛒🔧

Ten kod tworzy REST API z użyciem Flask, umożliwiające zarządzanie produktami w sklepie internetowym. Obsługuje CRUD (Create, Read, Update, Delete) dla produktów, a także upload obrazów.

## Kluczowe funkcje:
- **CRUD dla Produktów**: Dodaj, przeglądaj, aktualizuj, usuń produkty. 🔄
- **Upload Obrazów**: Bezpieczne przesyłanie i przechowywanie obrazów produktów. 🖼️
- **Bezpieczeństwo**: Ograniczenie wielkości przesyłanych treści i zabezpieczenie nazw plików. 🔒
- **Korzystanie z SQLite**: Prosta baza danych dla szybkiego prototypowania i testowania. 🗃️
- **CORS Enabled**: Umożliwia zapytania międzydomenowe dla łatwiejszego połączenia z front-endem. 🌐

## Model `Product`:
- Identyfikator, nazwa, cena, opis, nazwa pliku obrazu - podstawowe atrybuty produktu.

## Endpoints:
- `GET /`: Powitanie API.
- `POST /product`: Dodaj nowy produkt.
- `GET /products`: Pobierz wszystkie produkty.
- `POST /upload`: Przesyłaj obrazy.
- `GET /uploads/<filename>`: Pobierz przesłany obraz.
- `GET /product/<int:product_id>`: Pobierz szczegóły produktu.
- `PUT /product/<int:product_id>`: Aktualizuj produkt.
- `DELETE /product/<int:product_id>`: Usuń produkt.

