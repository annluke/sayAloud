(function(win, doc) {
  var audioPlayer = doc.getElementById("audiofile");
  var subtitles = doc.getElementById("subtitles");
  var syncData = [
    { "end": "0.225", "start": "0.125", "text": "There" },
    { "end": "0.485", "start": "0.225", "text": "were" },
    { "end": "1.085", "start": "0.485", "text": "10 in" },
    { "end": "1.325", "start": "1.085", "text": "his" },
    { "end": "1.685", "start": "1.325", "text": "bed" },
    { "end": "1.965", "start": "1.685", "text": "and the" },
    { "end": "2.245", "start": "1.965", "text": "little" },
    { "end": "2.565", "start": "2.245", "text": "one" },
    { "end": "2.985", "start": "2.565", "text": "said" },
    { "end": "3.485", "start": "2.985", "text": "Roll" },
    { "end": "3.965", "start": "3.485", "text": "over!" },
    { "end": "4.805", "start": "3.965", "text": "Roll" },
    { "end": "5.405", "start": "4.805", "text": "over!" }
  ];
  createSubtitle();

  function createSubtitle() {
    var element;
    for (var i = 0; i < syncData.length; i++) {
      element = doc.createElement('span');
      element.setAttribute("id", "c_" + i);
      element.innerText = syncData[i].text + " ";
      subtitles.appendChild(element);
    }
  }

  //hightlight word
  audioPlayer.addEventListener("timeupdate", function(e) {
    if (audioPlayer.currentTime === 0) {
      window.scrollTo(0, 0);
      return;
    }
    var foundNewHighlight = null;
    syncData.forEach(function(element, index, array) {
      if (audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end) {
        subtitles.children[index].classList.add("highlighted");
        subtitles.children[index].scrollIntoView(true);
        foundNewHighlight = subtitles.children[index];
      }
    });
    // Only remove highlight if we found a new one to highlight
    if (foundNewHighlight) {
      syncData.forEach(function(element, index, array) {
        if (foundNewHighlight !== subtitles.children[index]) {
          subtitles.children[index].classList.remove("highlighted");
        }
      });
    }
  });

}(window, document));
