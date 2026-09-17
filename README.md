# Mietraum – Vertragsportal Demo

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

`public/` enthält die eigenständige Website. Die Demo verwendet keine externen JavaScript-Bibliotheken, Telemetrie oder API-Schlüssel.
