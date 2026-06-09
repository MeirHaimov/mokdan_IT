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
                autocompleteList.style.display = 'none';
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
    document.getElementById('resId').textContent = user.personalId;
    document.getElementById('sapId').textContent = user.SapId;
    document.getElementById('networkId').textContent = user.networkId || 'לא מוגדר';
    document.getElementById('resDept').textContent = user.department;
    document.getElementById('resPhone').textContent = user.phone || 'לא מוגדר';
    document.getElementById('resComp').textContent = user.currentComputer;
    document.getElementById('resIP').textContent = user.ipAddress;
    document.getElementById('resOS').textContent = user.os;
    document.getElementById('resLoginTime').textContent = user.loginTime;
    document.getElementById('resHrStatus').textContent = user.hrStatus === "Active" ? 'פעיל' : 'לא פעיל';
    document.getElementById('emp').textContent = user.emp === "1" ? 'תעשייה' : user.emp === "2" ? 'יועץ' : user.emp === "3" ? 'קבלן' : 'לא מוגדר';

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

    document.getElementById('btnPrinters').onclick = () => {
        alert(`מדפסות מחוברות: \n${user.printers.join('\n')}`);
    };

    document.getElementById('btnRemote').onclick = () => {
        alert(`סקריפט השתלטות של לידור  ${user.currentComputer}`);
    };
    
 
    document.getElementById('btnDisk').onclick = () => {
        alert(`פתיחת כונן C במחשב  ${user.currentComputer}`);
    };
    document.getElementById('btnSMS').onclick = () => {
        alert(`שליחת אסמס למספר  ${user.phone}`);
    };

    detailsCard.style.display = 'block';
}


document.addEventListener('click', (e) => {
    if (e.target !== searchInput) autocompleteList.style.display = 'none';
});