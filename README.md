# multimedia-video-player

*Descriere:* Permite utilizatorului să vizioneze o colecție de minim 4 filme (stocate static în cadrul aplicației în folderul
media).
* 0.5p posibilitate navigare prin playlist; trecere automată la filmul următor
* 1p adăugarea de noi filme prin drag and drop sau prin intermediul unui control de tip input
* 1p modificare ordine filme în playlist; ștergere filme din playlist
* 1p aplicare de efecte video selectabile de către utilizator cu ajutorul unui element de tip canvas (notă: efectele vor fi
diferite de cele implementate pe parcursul seminarelor; efectele nu vor fi implementate cu ajutorul CSS)
* 2p desenare video și controale semitransparente (previous, play / pause, next, progress bar și volum) pe același
element canvas (suprapuse peste fluxul video) și determinarea operației pe baza poziției cursorului în cadrul canvasului
* 2p implementare funcționalitate de preview cadru (atunci când cursorul este deasupra progress bar-ului)
* 1p afișare subtitrări (stocate sub formă de fișiere JSON în cadrul aplicației)
* 0.5p stocare setări (ex: nivel volum, poziție curentă în cadrul playlist-ului) cu ajutorul Web Storage API

Notă: O colecție de fișiere video gratuite este disponibilă la adresa https://www.pond5.com

*Observații pentru fișierele CodTema_NrGrupa_NUME_Prenume.html/css/js:*
* trebuie să conțină doar cod sursă formatat și comentat;
* sunt singurele care intră în evaluarea proiectului;
* sunt puntate doar în măsura în care studentul dovedește la evaluare cunoașterea elementelor utilizate;
* nu este permis cod JavaScript preluat din nici o altă sursă (colegi, internet, etc.), cu excepția exemplelor de la
curs / seminar publicate pe platforma online.ase.ro; orice fragment de cod preluat din alte surse se
consideră tentativă de fraudă; se verifică automat;
* este permisă preluarea de fișiere media, cod CSS, fișiere de date din orice sursă;
* pentru implementarea cerințelor nu sunt permise alte biblioteci JavaScript (este permisă utilizarea Bootstrap
– doar partea de CSS). 


### Faza 1:
* Playlist cu elemente de tip div, urmând să fie adăugat template cu video și info într-o fază ulterioară.
* Navigare prin playlist, la click pe un element din playlist, acesta este afișat în canvas.
* Elementul care este în canvas, va fi evidențiat în playlist.
* Modificare ordine elemente în playlist.
* Ștergere elemente din playlist.

### Faza 2:
* Trecere automată la elementul următor după un interval de timp. Intervalul va fi o variabilă, care ulterior va fi preluată ca fiind durata unui videoclip.
* Adăugarea de noi elemente prin drag and drop sau prin intermediul unui control de tip input.

### Faza 3:
* Desenare video și controale semintransparente (previous, play/pause, next, progress bar și volum) pe același element canvas (suprapuse peste fluxul video).
* Determinarea poziției cursorului în cadrul canvasului.
* Crearea template-ului pentru obiectele din listă: preview/thumbnail video, titlu, durată.

### Faza 4:
* Aplicare de efecte video selectabile de către utilizator cu ajutorul unui element de tip canvas (efecte diferite față de cele implementate la seminar, fără implementări cu ajutorul CSS).

### Faza 5: 
* Implementare funcționalitate de preview cadru (atunci când cursorul este deasupra progress bar-ului).

### Faza 6: 
* Afișsare subtitrări (stocate sub formă de fișiere JSON în cadrul aplicației).

### Faza 7:
* Stocare setări (ex: nivel volum, poziție curentă în cadrul playlist-ului) cu ajutorul Web Storage API.

### Faza 8:
* Final touches and styling.
