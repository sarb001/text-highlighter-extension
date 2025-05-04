

// what to do  specifically/ action inside browser 

const Icon = document.createElement('span');

  Icon.textContent = '💡';
  Icon.style.position = 'absolute';
  Icon.style.padding = '6px';
  Icon.style.background = '#fff';
  Icon.style.border = '1px solid #ccc';
  Icon.style.borderRadius = '5px';
  Icon.style.zIndex = 9999;
  Icon.style.display = 'none';

document.body.appendChild(Icon);


document.addEventListener('mouseup', (event) => {

  console.log('CHecking', event);
  const SelectedText = window.getSelection().toString().trim();
  console.log('Selected Text 11 -', SelectedText);

  if (SelectedText.length > 0) {           
      const RangeforReplace = window.getSelection().getRangeAt(0);
      console.log('range -', RangeforReplace);

      const GetParams = RangeforReplace.getBoundingClientRect();
      console.log('params is -',GetParams);

      Icon.style.display = 'block';
      Icon.style.top  =  `${GetParams.top + window.scrollY - 30}px`;
      Icon.style.left =  `${GetParams.left + window.scrollX}px`;

      const StoreArr = [];
      console.log('store arr is ',StoreArr);

      Icon.onclick = () => {
        const HighlightedRes = confirm('Highlight the text ?');

         if(HighlightedRes){
             
              const span = document.createElement('span');
              const NewNode = document.createTextNode(SelectedText);
              
              span.appendChild(NewNode);
              span.className = 'paraclass';
              
              RangeforReplace.deleteContents();      // delete already present content
              RangeforReplace.insertNode(span);

              if(chrome?.storage?.local){
                    chrome.storage.local.get({ highlights : [] } , (data) => {
                      const updated  = [...data.highlights , { text : SelectedText }];
                      chrome.storage.local.set({ highlights : updated } , () => {
                        console.log('Highlight saved');
                      })
                    })
              }
       }
      }
  }
})