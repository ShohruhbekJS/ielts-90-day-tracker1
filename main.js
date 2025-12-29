const table = document.getElementById('tracker');

// Tracker yaratish
function loadTracker(){
  table.querySelectorAll('tr:not(:first-child)').forEach(r=>r.remove());

  for(let day=1; day<=90; day++){
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${day}</td>
      <td><input type="checkbox" data-day="${day}" data-skill="listening"></td>
      <td><input type="checkbox" data-day="${day}" data-skill="reading"></td>
      <td><input type="checkbox" data-day="${day}" data-skill="writing"></td>
      <td><input type="checkbox" data-day="${day}" data-skill="speaking"></td>
      <td><input type="checkbox" data-day="${day}" data-skill="vocab"></td>
      <td class="total">0</td>
    `;
    table.appendChild(row);
  }

  // LocalStorage dan yuklash
  table.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    const key = `${cb.dataset.day}-${cb.dataset.skill}`;
    cb.checked = localStorage.getItem(key) === 'true';
  });

  updateTotals();
}

// Total va progress bar
function updateTotals(){
  let completed = 0;
  table.querySelectorAll('tr').forEach((row,index)=>{
    if(index===0) return;
    const checks = row.querySelectorAll('input');
    let total=0;
    checks.forEach(c=> c.checked && total++);
    if(total>0) completed++;
    row.querySelector('.total').textContent = total;
  });
  const progress = Math.round((completed/90)*100);
  document.getElementById('progressBar').style.width = progress + '%';
}

// Checkbox o‘zgarganda LocalStorage ga saqlash
table.addEventListener('change', e=>{
  if(e.target.type==='checkbox'){
    const key = `${e.target.dataset.day}-${e.target.dataset.skill}`;
    localStorage.setItem(key, e.target.checked);
    updateTotals();
  }
});
function updateTotals(){
  let completed = 0;
  table.querySelectorAll('tr').forEach((row,index)=>{
    if(index===0) return;
    const checks = row.querySelectorAll('input');
    let total=0;
    checks.forEach(c=> c.checked && total++);
    
    // Rang berish
    const totalCell = row.querySelector('.total');
    totalCell.textContent = total;
    if(total <= 1){
      totalCell.style.backgroundColor = '#ff4d4d'; // Qizil
      totalCell.style.color = '#fff';
    } else if(total <= 3){
      totalCell.style.backgroundColor = '#ffc107'; // Sariq
      totalCell.style.color = '#000';
    } else {
      totalCell.style.backgroundColor = '#4caf50'; // Yashil
      totalCell.style.color = '#fff';
    }

    if(total>0) completed++;
  });

  const progress = Math.round((completed/90)*100);
  document.getElementById('progressBar').style.width = progress + '%';
}

// Sahifa yuklanganda tracker yaratish
loadTracker();
