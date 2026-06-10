const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const detailsCard = document.getElementById('detailsCard');

let searchTimeout;

searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    
    clearTimeout(searchTimeout);

    if (!val) {
        autocompleteList.style.display = 'none';
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            const res = await fetch(`/api/v1/users/search?query=${val}`);
            const data = await res.json();

            if (data.status === 'success' && data.results > 0) {
                autocompleteList.innerHTML = '';
                autocompleteList.style.display = 'block';
                
                data.data.users.forEach(user => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.textContent = `${user.firstName} ${user.lastName} (${user.personalId})`;
                    
                    item.addEventListener('click', () => {
                        showUserDetails(user);
                    });
                    autocompleteList.appendChild(item);
                });
            } else {
                autocompleteList.innerHTML = ''; 
                autocompleteList.style.display = 'block';
                
                const noResult = document.createElement('div');
                noResult.className = 'autocomplete-item';
                noResult.textContent = 'לא נמצאו תוצאות ';
                noResult.style.color = '#2813e4'; 
                noResult.style.cursor = 'default';
                
                autocompleteList.appendChild(noResult);
            }
        } catch (err) {
            console.error("DB ERROR", err);
        }
    }, 300); 
});

function showUserDetails(user) {
    searchInput.value = '';
    autocompleteList.style.display = 'none';

    document.getElementById('cardTitle').textContent = `${user.firstName} ${user.lastName} - ${user.personalId}`;
    document.getElementById('resName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('resId').textContent = user.personalId|| 'לא מוגדר';;
    document.getElementById('sapId').textContent = user.SapId|| 'לא מוגדר';;
    document.getElementById('networkId').textContent = user.networkId || 'לא מוגדר';
    document.getElementById('resDept').textContent = user.department|| 'לא מוגדר';;
    document.getElementById('resPhone').textContent = user.phone || 'לא מוגדר';
    document.getElementById('resComp').textContent = user.currentComputer|| '';
    
    document.getElementById('resIP').textContent = user.ipAddress || '';
    document.getElementById('resOS').textContent = user.os  || '';
    document.getElementById('resLoginTime').textContent = user.loginTime    || '';
    document.getElementById('resHrStatus').textContent = user.hrStatus === "Active" ? 'פעיל' : 'לא פעיל';
    document.getElementById('resRestartTime').textContent = user.restartTime || '';
    document.getElementById('emp').textContent = user.emp === "1" ? 'תעשייה' : user.emp === "2" ? 'יועץ' : user.emp === "3" ? 'קבלן' : 'לא מוגדר';
    document.getElementById('resLoginTime').textContent = user.loginTime;
    document.getElementById('resPocName').textContent = user.pocName;
    document.getElementById('resPocPhone').textContent = user.pocPhone;

    const sapGroup = document.getElementById('sapGroup');
    const networkGroup = document.getElementById('networkGroup');
    const idGroup = document.getElementById('idGroup');

    if (user.emp === "1" || user.emp === "2") {
        sapGroup.style.display = 'block';
        networkGroup.style.display = 'block';
        idGroup.style.display = 'block';
    } else {
        sapGroup.style.display = 'block';
        networkGroup.style.display = 'block';
        idGroup.style.display = 'block';
    }

    document.getElementById('btnVerify').onclick = () => {
        if (user.emp === "1") {
            alert(
                ` אימות פרטים :\n\n` +
                `תעודת זהות: ${user.personalId}\n` +
                `תאריך לידה: ${user.birthDate || 'לא מעודכן במערכת'}\n` +
                `תחילת עבודה: ${user.startDate || 'לא מעודכן במערכת'}`
            );
        } 
        else {
            alert(
                `אימות פרטים :\n\n` +
                `תחילת עבודה: ${user.startDate || 'לא מעודכן במערכת'}\n` +
                `שם מנהל מאשר: ${user.pocName || 'לא מעודכן במערכת'}\n` +
                `טלפון מנהל: ${user.pocPhone || 'לא מעודכן במערכת'}`
            );
        }
    };
    document.getElementById('btnPrinters').onclick = () => {
        alert(`מדפסות מחוברות: \n${user.printers.join('\n')}`);
    };

    document.getElementById('btnRemote').onclick = () => {
        alert(`סקריפט השתלטות של לידור  ${user.currentComputer}`);
    };
    
 
    document.getElementById('btnDisk').onclick = () => {

    const networkPath = `file:////${user.currentComputer}/c$`;
    window.open(networkPath, '_blank');
    };
    document.getElementById('btnSMS').onclick = () => {
        alert(`שליחת אסמס למספר  ${user.phone}`);
    };

    detailsCard.style.display = 'block';
}


document.addEventListener('click', (e) => {
    if (e.target !== searchInput) autocompleteList.style.display = 'none';
});