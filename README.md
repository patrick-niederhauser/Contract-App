# Contract App

Statische Web-Demo für Gewerbemietverträge in der Schweiz und Deutschland.

## Lokal starten

Node.js 22 oder neuer; keine zusätzlichen Pakete erforderlich.

```sh
npm run dev
```

Vorschau: http://127.0.0.1:4173

```sh
npm run build
npm run preview
```

## Veröffentlichung mit GitHub Pages

Repository-Einstellung: **Settings → Pages → Source: GitHub Actions**.
Nach jedem Push auf `main` veröffentlicht `.github/workflows/pages.yml` den geprüften statischen Build.

## Umfang

- CH/DE mit eigener Währung, Formatierung und Flächenbezügen
- Mietobjekte, Preise, Vertragsdauer, Optionen und Rückbauumfang
- Ausbau- und Schnittstellenmatrix mit Feldfreigaben
- Vorschläge, Übernahme und Bestätigung pro Abschnitt
- Optionale lokale Dokumente, simulierte ERP-Übernahme und Gesamtvorschau

Dies ist ein funktionsfähiger Browser-Prototyp mit fiktiven Vertragsdaten und verkürzten Beispieltexten. Der Rollenwechsel ist eine Demo-Funktion und keine Zugriffskontrolle. Daten und ausgewählte Dateien werden nur für die aktuelle Browseransicht gehalten; beim Neuladen gehen sie verloren. Es gibt keine ERP-Verbindung, Server-Speicherung, gemeinsame Bearbeitung oder elektronische Signatur. Es werden keine echten Kundendokumente mitgeliefert.

`public/` enthält die eigenständige Website. Die Demo verwendet keine Telemetrie oder API-Schlüssel. Zum lokalen Einlesen von DOCX/PDF werden Mammoth 1.11.0 (BSD-2-Clause) und PDF.js 5.4.624 (Apache-2.0) bei Bedarf über jsDelivr geladen. Dokumentinhalte werden an keinen Auslesedienst gesendet.

## Vorlagenverwaltung

In der Bewirtschafter-Demosicht steht eine Bibliothek für Vertragsvorlagen und Beilagen bereit. PDF mit Textschicht, DOCX und TXT können bis 10 MB eingelesen werden; Scans benötigen manuell ergänzten Text (kein OCR). Land und Hauptnutzung bestimmen den Vorschlag, die Vorlage bleibt vor Entwurfserstellung frei wählbar. Texte und Beilagen werden als eigene Fassungen übernommen und ergänzen die strukturierten Demoartikel. Es gibt keine automatische Klauselzuordnung. Bereits erstellte Entwürfe werden durch Bibliotheksänderungen nicht verändert.

Die Bibliothek bleibt nur in der aktuellen Browseransicht erhalten. Die Rollenwahl ist eine Simulation; echte Berechtigungsprüfung und dauerhafte Speicherung benötigen ein Backend.
