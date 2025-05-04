

// what to do  specifically/ action inside extension like layour ,click etc

const Btn = document.getElementById('content');
const SummarizeBtn = document.getElementById('summarize');
const DataOutput = document.getElementById('output');
const ClearData = document.getElementById('clearall');


    Btn.addEventListener('click' , () => {
        chrome.storage.local.get({ highlights : [] } , (data) => {
            DataOutput.style.display = 'block';
            DataOutput.innerHTML = '';

            if(data.highlights.length > 0 ){
                data.highlights.forEach((elem,index) => {
                    console.log('elem -',elem.text);
                       const  newdiv = document.createElement('div');
                        newdiv.style.background = 'lightgreen';
                        newdiv.style.margin = '4%';  
                        newdiv.style.paddingright = '2px';
                        newdiv.style.padding = '3%';
                        newdiv.style.cursor = 'pointer';
    
                        const Textdiv = document.createElement('p');

                        Textdiv.textContent = `${elem.text} 🗑️`;
                        Textdiv.onclick = () => {
                                const updated = [...data.highlights];
                                updated.splice(index,1);
                                chrome.storage.local.set({ highlights:updated } , () => {
                                    Btn.click();
                                })
                        }

                         newdiv.appendChild(Textdiv);
                         DataOutput.appendChild(newdiv);
                });
            }else{
                DataOutput.innerHTML = 'No Content Present';
            }   

        })
    })


    ClearData.addEventListener('click' , () => {
         chrome.storage.local.set({ highlights : [] } , (data) => {
             DataOutput.innerHTML = '';
         })
    })  