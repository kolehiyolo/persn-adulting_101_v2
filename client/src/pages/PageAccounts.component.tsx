// * Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { Account } from '../types';
import { Icon } from '../types';

// * Styling
import './PageAccounts.component.scss';

// * Components
import BoxAccountsItem from '../components/BoxAccountsItem.component';
import DivAmount from '../components/DivAmount.component';

interface PageAccountsProps {
  accounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
  defaultCurrency: string;
}

interface DivAccountsListContainerProps {
  filteredAccounts: Account[];
  icons: Icon[];
  activeSubTab: { [key: string]: string };
}

interface DivAccountsListProps {
  filteredAccounts: Account[];
  findIconName: (icon_id: string) => string;
}

interface DebtData {
  title: string;
  className: string;
  items: Account[]; // Specify that items will be an array of Account
}

function DivAccountsListRegular({ filteredAccounts, findIconName }: DivAccountsListProps) {
  return (
    <ul className="accounts-list-regular">
      {filteredAccounts.map(account => (
        <BoxAccountsItem 
          key={account.id}
          account={account}
          icon_name={findIconName(account.icon_id)}
        />
      ))}
    </ul>
  );
}

function DivAccountsListDebts({ filteredAccounts, findIconName }: DivAccountsListProps) {
  const [debtsData, setDebtsData] = useState<DebtData[]>([]);

  const findDebts = useCallback(() => {
    const newDebtsData: DebtData[] = [
      {
        title: 'I owe',
        className: 'i-owe',
        items: [],
      },
      {
        title: 'Owed to me',
        className: 'owed-to-me',
        items: [],
      },
      {
        title: 'Settled',
        className: 'settled',
        items: [],
      },
    ]

    filteredAccounts.forEach(account => {
      const titleToFind = 
        account.balance < 0 ? 'I owe'
        : account.balance > 0 ? 'Owed to me' 
        : 'Settled';
      
      newDebtsData.find(
        debtData => debtData.title === titleToFind
      )?.items.push(account);
    });

    setDebtsData(newDebtsData);
  }, [filteredAccounts]);

  useEffect(() => {
    findDebts();
  }, [findDebts]);


  return (
    <ul className="accounts-list-debts">
      {
        debtsData.map(debtsDataItem => (
          debtsDataItem.items.length !== 0 &&
          <li 
            key={debtsDataItem.className}
            className={`debt-${debtsDataItem.className}`}
          >
            <div
              className={`debt-header`}
            >
              <h3>{debtsDataItem.title}</h3>
              <DivAmount 
                amount={debtsDataItem.items.reduce((total, account) => total + account.balance, 0)}
                currency={debtsDataItem.items[0].currency}
              />
            </div>
            <ul>
              {debtsDataItem.items.map(account => (
                <BoxAccountsItem 
                  key={account.id}
                  account={account}
                  icon_name={findIconName(account.icon_id)}
                />
              ))}
            </ul>
          </li>
        ))
      }
    </ul>
  );
}

function DivAccountsListFunds({ filteredAccounts, findIconName }: DivAccountsListProps) {
  return (
    <ul className="accounts-list-funds">
      {filteredAccounts.map(account => (
        <BoxAccountsItem 
          key={account.id}
          account={account}
          icon_name={findIconName(account.icon_id)}
        />
      ))}
    </ul>
  );
}

function DivAccountsListContainer({ filteredAccounts, icons, activeSubTab }: DivAccountsListContainerProps) {
  const findIconName = (icon_id: string) => {
    const icon = icons.find(icon => {
      return icon.id === icon_id;
    });
    return icon ? icon.name : '';
  }

  return (
    <div className="accounts-list">
      {
        activeSubTab['/accounts'] === '/regular' &&
        <DivAccountsListRegular 
          filteredAccounts={filteredAccounts} 
          findIconName={findIconName}
        />
      }
      {
        activeSubTab['/accounts'] === '/debts' &&
        <DivAccountsListDebts 
          filteredAccounts={filteredAccounts} 
          findIconName={findIconName}
        />
      }
      {
        activeSubTab['/accounts'] === '/funds' &&
        <DivAccountsListFunds 
          filteredAccounts={filteredAccounts} 
          findIconName={findIconName}
        />
      }
    </div>
  );
}

export default function PageAccounts({ accounts, icons, activeSubTab, defaultCurrency}: PageAccountsProps) {
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  
  const findSubTabTotal = () => {
    const subTabTotal = filteredAccounts.reduce((total, account) => {
      return total + account.balance;
    }, 0);
    return subTabTotal;
  }

  const findFilteredAccounts = useCallback(() => {
    const filteredAccounts = accounts.filter(account => {
      return account.type === activeSubTab['/accounts'].replace('/', '');
    });
    setFilteredAccounts(filteredAccounts);
  }, [accounts, activeSubTab]);

  useEffect(() => {
    findFilteredAccounts();
  }, [findFilteredAccounts]);

  return (
    <div 
      className={
        [
          `page-accounts`,
          `page`,
        ].join(' ')
      }
    >
      <div className="page-header">
        <h2>Total</h2>
        <DivAmount
          amount={findSubTabTotal()}
          currency={defaultCurrency}
        />
      </div>
      <DivAccountsListContainer 
        filteredAccounts={filteredAccounts} 
        icons={icons}
        activeSubTab={activeSubTab}
      />
    </div>
  );
}