import React from 'react';
import { it, expect,describe, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
//? for testing components that as routes
import { render, screen, within } from '@testing-library/react';
import { HomePage } from './HomePage';
import axios from 'axios';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    //?run this function instead of calling realbackend by axios.get
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        //*it shud normally return what axios.get return
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        }
      }
    });
  });

  it('displays the products correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    //?when we have multiple product, we use getAllByTestId
    const productContainers = await screen.findAllByTestId('product-container');
    
    //because we display 2 elements in the data 
    expect(productContainers.length).toBe(2);

    within(productContainers[0]).getByText(
      'Black and Gray Athletic Cotton Socks - 6 Pairs')
    within(productContainers[1]).getByText(
      'Intermediate Size Basketball')
  });
});
