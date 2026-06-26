const compactDays=[
 {id:'d1',title:'Day 1 - Cathedral + Belvedere',date:'Thu, June 25',start:'07:45',items:[
  {id:'c1-1',kind:'fixed',title:'Wake up',dur:30,note:'Start the day from Laudongasse 8 without rushing. This is just enough time to get ready, check tickets, charge phones, and leave with the first route already decided.',tags:['hotel','start']},
  {id:'c1-2',kind:'food',base:'Breakfast',selected:0,options:['Cafe Eiles','Cafe Hummel'],dur:60,note:'One full hour for a real breakfast near the hotel. Keep it comfortable, but do not let it turn into a long sit-down delay before the cathedral block.'},
  {id:'c1-3',kind:'transit',title:'Transit to St. Stephen’s Cathedral',dur:30,note:'Simple transfer toward Stephansplatz. This buffer covers walking to transit, finding the entrance area, and arriving without immediately feeling behind.'},
  {id:'c1-4',kind:'fixed',title:'St. Stephen’s Cathedral visit',dur:110,note:'Combined cathedral block: exterior, roof tiles, interior, and one tower/catacomb-style highlight if it fits. This replaces several smaller cathedral cards so the morning feels cleaner.' ,tags:['church','old town']},
  {id:'c1-5',kind:'transit',title:'Transit to Upper Belvedere',dur:35,note:'Move directly from the old center toward Belvedere. Keep this as a practical transfer instead of adding another walk in the middle.'},
  {id:'c1-6',kind:'fixed',title:'Upper Belvedere Gallery',dur:150,note:'Main art and palace stop for the day. Focus on Klimt, the major galleries, and the palace setting instead of trying to see every room at the same pace.',tags:['major sight','ticket']},
  {id:'c1-7',kind:'food',base:'Lunch near Belvedere',selected:0,options:['Salm Bräu','Cafe Goldegg'],dur:60,note:'One hour for lunch near Belvedere. Choose whichever option keeps walking low and gives a proper break after the long gallery block.'},
  {id:'c1-8',kind:'option',title:'Belvedere Gardens + Botanical Garden Break',dur:75,note:'The one relaxed walk/rest block for Day 1. Use the gardens or nearby botanical paths to slow down, take photos, and reset before the evening food block.',tags:['one walk','rest']},
  {id:'c1-9',kind:'food',base:'Dinner',selected:0,options:['Figlmüller Bäckerstraße','Griechenbeisl'],dur:60,note:'One hour for dinner in the center. Pick the easier reservation or route rather than adding another sightseeing detour before eating.'},
  {id:'c1-10',kind:'transit',title:'Return to hotel / end of day',dur:30,note:'Return to Laudongasse 8 and leave the rest of the evening open. This is intentionally not another planned walk.'}
 ]},
 {id:'d2',title:'Day 2 - Schönbrunn + relaxed afternoon',date:'Fri, June 26',start:'08:00',items:[
  {id:'c2-1',kind:'fixed',title:'Wake up',dur:30,note:'Later, calmer start for the palace day. Check the route to Schönbrunn and leave with enough time that breakfast and the palace visit do not feel compressed.',tags:['hotel','start']},
  {id:'c2-2',kind:'transit',title:'Transit to Schönbrunn',dur:40,note:'Travel toward Schönbrunn with enough buffer for walking through the station and palace grounds. Do not add a separate city walk before this.'},
  {id:'c2-3',kind:'food',base:'Breakfast at / near Schönbrunn',selected:0,options:['Schönbrunner Schlosscafe','Gerstner Schönbrunn'],dur:60,note:'One full hour for breakfast or pastry near the palace area. This keeps the morning steady and avoids needing a second food stop too soon.'},
  {id:'c2-4',kind:'option',title:'Schönbrunn Gardens',dur:90,note:'The one walk for Day 2. Use the garden axis, fountains, and exterior palace views as the outdoor portion of the day instead of stacking extra park or evening walks.',tags:['one walk','palace']},
  {id:'c2-5',kind:'fixed',title:'Schönbrunn Palace',dur:165,note:'Main planned sight for the day. Keep the focus on the imperial rooms and palace story, then leave space afterward instead of forcing multiple replacement attractions.',tags:['major sight','ticket']},
  {id:'c2-6',kind:'food',base:'Lunch near Schönbrunn',selected:1,options:['Della Lucia','Cafe Raimann'],dur:60,note:'One hour for lunch close to Schönbrunn. This is the reset after the palace block, not the start of another packed sequence.'},
  {id:'c2-7',kind:'option',base:'Afternoon before dinner',selected:0,options:['Auer-Welsbach-Park rest','Schönbrunn Palm House','Schönbrunn Desert House','Cafe Dommayer cake break','Landtmann Jausen Station treat stop'],dur:75,note:'One relaxed pre-dinner choice after lunch. Pick only one: a shaded park break, one small Schönbrunn-area attraction, or a cafe/treat stop. This adds something to the afternoon without rebuilding the day into a packed itinerary.',tags:['afternoon','choose one']},
  {id:'c2-8',kind:'food',base:'Dinner',selected:0,options:['Rebhuhn','Cafe Benno'],dur:60,note:'One hour for dinner back toward the hotel side. Keep the evening open unless you deliberately add one option from the bank later.'},
  {id:'c2-9',kind:'transit',title:'Return to hotel / open evening',dur:40,note:'Return after dinner and leave the night unplanned. This creates the empty space that was missing from the earlier version.'}
 ]},
 {id:'d3',title:'Day 3 - KHM + Karlskirche + Cruise',date:'Sat, June 27',start:'08:30',items:[
  {id:'c3-1',kind:'fixed',title:'Wake up',dur:30,note:'Day 3 now starts later at 8:30. This gives more recovery time before the museum and cruise day instead of beginning too early.',tags:['hotel','start']},
  {id:'c3-2',kind:'food',base:'Breakfast near hotel / center',selected:0,options:['Cafe Eiles','Cafe Hummel'],dur:60,note:'One full hour for breakfast before the museum area. Keep it simple and nearby so the later start does not create pressure.'},
  {id:'c3-3',kind:'transit',title:'Transit to Museum Quarter area',dur:30,note:'Move toward Maria-Theresien-Platz and the Kunsthistorisches Museum. This is a routing block, not a separate sightseeing walk.'},
  {id:'c3-4',kind:'option',title:'Maria-Theresien-Platz + MuseumsQuartier Exterior',dur:50,note:'The one walk/photo block for Day 3. Use it for the museum facades, monument, and courtyard atmosphere before going inside KHM.',tags:['one walk','architecture']},
  {id:'c3-5',kind:'fixed',title:'Kunsthistorisches Museum',dur:150,note:'Main museum stop of the day. Pick several strong rooms or artists and enjoy the building itself rather than trying to cover every collection.',tags:['major sight','ticket']},
  {id:'c3-6',kind:'food',base:'Lunch near museum / hotel side',selected:0,options:['Fromme Helene','Cafe Landtmann'],dur:60,note:'One hour for lunch after KHM. This should be the break between the museum and Karlskirche, not another long detour.'},
  {id:'c3-7',kind:'fixed',title:'Karlskirche',dur:60,note:'Focused church stop after lunch. See the Baroque interior, dome frescoes, and main square without adding another surrounding walk.',tags:['church','ticket']},
  {id:'c3-8',kind:'food',base:'Dinner',selected:0,options:['Griechenbeisl','Figlmüller Bäckerstraße'],dur:60,note:'One hour for dinner before the cruise. Choose the place that keeps the boarding route easiest, even if another restaurant looks slightly better.'},
  {id:'c3-9',kind:'transit',title:'Walk to cruise / boarding area',dur:20,note:'Short buffer to get to the correct DDSG boarding point. Keep this because missing the boarding location would be worse than having a little extra time.'},
  {id:'c3-10',kind:'option',base:'Final cruise option',selected:0,options:['DDSG Evening Sightseeing / Dinner Cruise','DDSG Heurigen Cruise with Viennese Songs'],dur:180,note:'Final planned experience of the trip. This keeps the evening distinctive without adding another walking block before or after.',tags:['evening','cruise']},
  {id:'c3-11',kind:'transit',title:'Return to hotel / end of trip day',dur:30,note:'Return from the cruise area and keep the rest of the night open. No extra final walk is planned.'}
 ]}
];
initialDays.length=0;
compactDays.forEach(d=>initialDays.push(structuredClone(d)));
if(localStorage.getItem('planner-vienna-compact-version')!=='2'){
  state=structuredClone(compactDays);
  expanded.clear();
  lastMovedId=null;
  lastDurationId=null;
  localStorage.setItem('planner-vienna-v2',JSON.stringify(state));
  localStorage.setItem('planner-vienna-compact-version','2');
  render();
} else {
  render();
}
