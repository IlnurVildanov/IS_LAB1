window.currentView = 'table';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const view = this.getAttribute('data-view');
            switchView(view);
        });
    });

    document.getElementById('create-btn').addEventListener('click', openCreateModal);

    loadTable();

    connectWebSocket();
});

function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    document.getElementById(`${viewName}-view`).classList.add('active');

    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === viewName) {
            btn.classList.add('active');
        }
    });

    window.currentView = viewName;

    if (viewName === 'table') {
        loadTable();
    }
}