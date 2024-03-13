import { db } from '@/lib/db';

const OrganizationIdPage = () => {
  async function create(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;

    await db.board.create({
      data: {
        title,
      },
    });
  }

  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="入力してください"
          className="border border-black p-1"
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;
