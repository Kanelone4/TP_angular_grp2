import { Component, OnInit, HostListener } from '@angular/core';
import { DataService, UserData } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DataTableComponent implements OnInit {
  data: UserData[] = [];
  filteredData: UserData[] = [];
  searchTerm: string = '';
  filterMenuVisible: boolean = false;
  selectedFilterOption: string = 'username';
  selectedUser: UserData | null = null;
  dropdownVisible: boolean = false;
  editingUser: UserData | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.filteredData = data;
      this.setPage(1);
    });
  }

  filterData() {
    this.filteredData = this.data.filter(user =>
      this.matchesSearchCriteria(user, this.searchTerm)
    );
    this.setPage(1);
  }

  matchesSearchCriteria(user: UserData, term: string): boolean {
    term = term.toLowerCase().trim();
    if (term === '') return true;

    switch (this.selectedFilterOption) {
      case 'username':
        return user.username.toLowerCase().includes(term);
      case 'userStatus':
        return user.userStatus.toLowerCase().includes(term);
      default:
        return (
          user.username.toLowerCase().includes(term) ||
          user.userStatus.toLowerCase().includes(term)
        );
    }
  }

  toggleFilterMenu() {
    this.filterMenuVisible = !this.filterMenuVisible;
  }

  selectFilterOption(option: string) {
    this.selectedFilterOption = option;
    this.filterMenuVisible = false;
    this.filterData();
  }

  toggleDropdown(user: UserData) {
    if (this.selectedUser === user) {
      this.dropdownVisible = !this.dropdownVisible;
    } else {
      this.selectedUser = user;
      this.dropdownVisible = true;
    }
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.filteredData.forEach(user => user.selected = checked);
  }

  onEditUser(user: UserData) {
    this.editingUser = { ...user };
  }

  saveUser() {
    if (this.editingUser) {
      const index = this.data.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.data[index] = this.editingUser!;
        this.filterData();
        this.editingUser = null;
      }
    }
  }

  cancelEdit() {
    this.editingUser = null;
  }

  onChangeStatus(user: UserData) {
    user.userStatus = user.userStatus === 'Active' ? 'Inactive' : 'Active';
    this.updateUser(user);
  }

  onDeleteUser(user: UserData) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username}?`)) {
      this.data = this.data.filter(u => u.id !== user.id);
      this.filteredData = this.filteredData.filter(u => u.id !== user.id);
    }
  }

  updateUser(user: UserData) {
    const index = this.data.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.data[index] = user;
      this.filterData();
    }
  }

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown-menu') && !target.closest('.icon-button')) {
    this.dropdownVisible = false;
    this.selectedUser = null;
  }
  if (!target.closest('.filter-dropdown') && !target.closest('.filter-button')) {
    this.filterMenuVisible = false;
  }
}

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
