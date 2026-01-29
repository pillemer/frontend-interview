import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Applications from "./Applications";

const mockFetch = (data: object[], hasMore = true) => {
  const linkHeader = hasMore
    ? '<http://localhost:3001/api/applications?_page=2>; rel="next"'
    : "";
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(data),
    headers: new Headers({ Link: linkHeader }),
  });
};

const mockApp = (id: number, name: string) => ({
  id,
  first_name: name,
  last_name: "Test",
  company: "Test Co",
  email: "test@test.com",
  loan_amount: 10000,
  date_created: "2024-01-01",
  expiry_date: "2024-12-01",
});

describe("Applications", () => {
  it("fetches and displays applications", async () => {
    mockFetch([mockApp(1, "John"), mockApp(2, "Jane")]);
    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("John Test")).toBeInTheDocument();
      expect(screen.getByText("Jane Test")).toBeInTheDocument();
    });
  });

  it("shows load more button when there are more pages", async () => {
    mockFetch([mockApp(1, "John")], true);
    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("Load more")).toBeInTheDocument();
    });
  });

  it("hides load more button on last page", async () => {
    mockFetch([mockApp(1, "John")], false);
    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("John Test")).toBeInTheDocument();
    });
    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  it("appends more applications when clicking load more", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve([mockApp(1, "John")]),
        headers: new Headers({ Link: 'rel="next"' }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve([mockApp(2, "Jane")]),
        headers: new Headers({}),
      });

    render(<Applications />);
    await waitFor(() => screen.getByText("Load more"));

    await userEvent.click(screen.getByText("Load more"));

    await waitFor(() => {
      expect(screen.getByText("John Test")).toBeInTheDocument();
      expect(screen.getByText("Jane Test")).toBeInTheDocument();
    });
  });
});
