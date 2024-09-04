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
  const [debtsIOwe, setDebtsIOwe] = useState<Account[]>([]);
  const [debtsOwedToMe, setDebtsOwedToMe] = useState<Account[]>([]);
  const [debtsSettled, setDebtsSettled] = useState<Account[]>([]);

  const findDebts = useCallback(() => {
    let debtsIOwe: Account[] = [];
    let debtsOwedToMe: Account[] = [];
    let debtsSettled: Account[] = [];

    filteredAccounts.map(account => {
      if (account.balance < 0) {
        debtsIOwe.push(account);
      } else if (account.balance > 0) {
        debtsOwedToMe.push(account);
      } else {
        debtsSettled.push(account);
      }
    });

    setDebtsIOwe(debtsIOwe);
    setDebtsOwedToMe(debtsOwedToMe);
    setDebtsSettled(debtsSettled);
  }, [filteredAccounts]);

  useEffect(() => {
    findDebts();
  }, [findDebts]);

  return (
    <ul className="accounts-list-debts">
      {
        debtsIOwe.length !== 0 &&
        <li>
          <div>
            <h3>I owe</h3>
            <DivAmount 
              amount={debtsIOwe.reduce((total, account) => total + account.balance, 0)}
              currency={debtsIOwe[0].currency}
            />
          </div>
          <ul>
            {debtsIOwe.map(account => (
              <BoxAccountsItem 
                key={account.id}
                account={account}
                icon_name={findIconName(account.icon_id)}
              />
            ))}
          </ul>
        </li>
      }
      {
        debtsOwedToMe.length !== 0 &&
        <li>
          <div>
            <h3>Owed to me</h3>
            <DivAmount 
              amount={debtsOwedToMe.reduce((total, account) => total + account.balance, 0)}
              currency={debtsOwedToMe[0].currency}
            />
          </div>
          <ul>
            {debtsOwedToMe.map(account => (
              <BoxAccountsItem 
                key={account.id}
                account={account}
                icon_name={findIconName(account.icon_id)}
              />
            ))}
          </ul>
        </li>
      }
      {
        debtsSettled.length !== 0 &&
        <li>
          <div>
            <h3>Settled</h3>
            <DivAmount 
              amount={debtsSettled.reduce((total, account) => total + account.balance, 0)}
              currency={debtsSettled[0].currency}
            />
          </div>
          <ul>
            {debtsSettled.map(account => (
              <BoxAccountsItem 
                key={account.id}
                account={account}
                icon_name={findIconName(account.icon_id)}
              />
            ))}
          </ul>
        </li>
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