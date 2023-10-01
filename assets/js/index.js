var host = 'http://192.168.101.5:1316/api';
var currentPage = 1;
var totalFiles = 1;
var totalPages = 1;

function updatePage(page) {
    var tableBody = document.getElementById('main-file').querySelector('tbody');
    var pageNavUl = document.getElementById('page-nav').querySelector('ul');
    // Clear existing table rows
    // Perform the AJAX POST request
    $.ajax({
        url: host,
        type: 'POST',
        data: {query: "tenire", page: page, pageSize: "15"}, // Pass the search query as data
        success: function (response) {
            // Handle the response from the server
            console.log('POST request successful');
            console.log(response);
            tableBody.innerHTML = "";
            var index = 1;
            // Clear the existing table rows
            // tableBody.empty();
            // Iterate over the response data and generate table rows
            response.fileList.forEach(function (data) {
                var row = document.createElement('tr');

                // Create table cells and populate them with data
                var indexCell = document.createElement('td');
                indexCell.textContent = index++;
                row.appendChild(indexCell);


                var actionsCell = document.createElement('td');
                var downloadLink = document.createElement('a');
                downloadLink.href = data.downloadUrl;
                downloadLink.textContent = '下载';
                actionsCell.appendChild(downloadLink);
                actionsCell.innerHTML += '|';
                var viewLink = document.createElement('a');
                viewLink.href = data.viewUrl;
                viewLink.textContent = '查看';
                actionsCell.appendChild(viewLink);
                row.appendChild(actionsCell);

                var fileNameCell = document.createElement('td');
                var fileIcon = document.createElement('i');
                fileIcon.className = 'fa ' + data.iconClass;
                fileNameCell.appendChild(fileIcon);
                fileNameCell.innerHTML += ' ' + data.fileName;
                fileNameCell.className = 'filename';
                row.appendChild(fileNameCell);

                var fileSizeCell = document.createElement('td');
                fileSizeCell.textContent = data.fileSize;
                row.appendChild(fileSizeCell);

                var fileFormatCell = document.createElement('td');
                fileFormatCell.textContent = data.fileFormat;
                row.appendChild(fileFormatCell);

                var uploadTimeCell = document.createElement('td');
                uploadTimeCell.textContent = data.uploadTime;
                row.appendChild(uploadTimeCell);

                var uploaderIPCell = document.createElement('td');
                uploaderIPCell.textContent = data.uploaderIP + "*";
                row.appendChild(uploaderIPCell);

                // Append the row to the table body
                tableBody.appendChild(row);

            });

            var totalFiles = response.fileNum; // Replace with actual data from the response
            var totalPages = response.pageCount; // Replace with actual data from the response

            currentPage = page;

            // Update the total files message
            var totalFilesMessage = '共有 ' + totalFiles + ' 个文件&nbsp;&nbsp;当前第 ' + currentPage + ' 页，共 ' + totalPages + ' 页';
            $('.file-info.col-md-5.mx-4').html(totalFilesMessage);

            pageNavUl.innerHTML = "";
            var row = document.createElement('li');
            if (currentPage === 1) {
                row.className = "page-item disabled";
            } else {
                row.className = "page-item";
            }
            var firstPage = document.createElement('span');
            firstPage.className = "page-link";
            firstPage.innerHTML = "首页";
            $(firstPage).click(function () {
                updatePage(1);
            });
            row.appendChild(firstPage);
            pageNavUl.appendChild(row);

            row = document.createElement('li');
            if (currentPage === 1) {
                row.className = "page-item disabled";
            } else {
                row.className = "page-item";
            }
            var prevPage = document.createElement('span');
            prevPage.className = "page-link";
            prevPage.innerHTML = "&laquo;";
            $(prevPage).click(function () {
                updatePage(currentPage - 1);
            });
            row.appendChild(prevPage);
            pageNavUl.appendChild(row);
            var number = 5;
            for (let i = currentPage - 5; i <= totalPages && i < currentPage + number; i++) {
                if (i <= 0) {
                    number++;
                    continue;
                }
                row = document.createElement('li');
                if (currentPage === i) {
                    row.className = "page-item disabled";
                } else {
                    row.className = "page-item";
                }
                let pageIndex = document.createElement('a');
                pageIndex.className = "page-link";
                pageIndex.innerHTML = "" + i;
                $(pageIndex).click(function () {
                    updatePage(i);
                });
                row.appendChild(pageIndex);
                pageNavUl.appendChild(row);
            }
            row = document.createElement('li');
            if (currentPage === totalPages) {
                row.className = "page-item disabled";
            } else {
                row.className = "page-item";
            }
            const nextPage = document.createElement('span');
            nextPage.className = "page-link";
            nextPage.innerHTML = "&raquo;";
            $(nextPage).click(function () {
                updatePage(currentPage + 1);
            });
            row.appendChild(nextPage);
            pageNavUl.appendChild(row);

            row = document.createElement('li');
            if (currentPage === totalPages) {
                row.className = "page-item disabled";
            } else {
                row.className = "page-item";
            }
            var lastPage = document.createElement('span');
            lastPage.className = "page-link";
            lastPage.innerHTML = "尾页";
            $(lastPage).click(function () {
                updatePage(totalPages);
            });
            row.appendChild(lastPage);
            pageNavUl.appendChild(row);
        },
        error: function (xhr, status, error) {
            // Handle errors
            console.log('POST request failed');
            console.log(error);
        }
    });
}

$(document).ready(function () {
    // Attach a click event handler to the search button
    $('#searchButton').click(function () {
        // Get the search query from the input field
        var searchQuery = $('input[type="search"]').val();
    });
    updatePage(currentPage);
    $('.page-index').click(function () {
        // Get the page number from the button's text or data attribute
        var clickPage = parseInt($(this).text()); // Replace with actual way to get the page number

        // Call the updateTableAndInfo function with the new page number
        updatePage(clickPage);
    });
    $('.page-first').click(function () {
        // Call the updateTableAndInfo function with the new page number
        updatePage(1);
    });
    $('.page-last').click(function () {
        // Call the updateTableAndInfo function with the new page number
        updatePage(totalPages);
    });
    $('.page-next').click(function () {
        // Call the updateTableAndInfo function with the new page number
        updatePage(currentPage + 1);
    });
    $('.page-prev').click(function () {
        // Call the updateTableAndInfo function with the new page number
        updatePage(currentPage - 1);
    });
});