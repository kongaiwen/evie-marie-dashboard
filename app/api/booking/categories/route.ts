import { NextResponse } from 'next/server';
import {
  BookingCategory,
  ProfessionalSubcategory,
  FriendsSubcategory,
  KidActivitiesSubcategory,
  AVAILABILITY_CONSTRAINTS,
} from '@/lib/booking/types';

export async function GET() {
  try {
    const categories = [
      {
        category: BookingCategory.PROFESSIONAL,
        subcategories: Object.values(ProfessionalSubcategory),
      },
      {
        category: BookingCategory.FRIENDS,
        subcategories: Object.values(FriendsSubcategory),
      },
      {
        category: BookingCategory.KID_ACTIVITIES,
        subcategories: Object.values(KidActivitiesSubcategory),
      },
    ];

    // Add constraints info for each subcategory
    const categoriesWithConstraints = categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories.map((sub) => {
        const constraint = AVAILABILITY_CONSTRAINTS.find(
          (c) => c.category === cat.category && c.subcategory === sub
        );

        return {
          name: sub,
          weekday: {
            startDay: constraint?.weekdayStart,
            endDay: constraint?.weekdayEnd,
            startTime: constraint?.startTime,
            endTime: constraint?.endTime,
          },
          weekend: constraint?.weekendStartTime
            ? {
                startDay: constraint?.weekendStart,
                endDay: constraint?.weekendEnd,
                startTime: constraint?.weekendStartTime,
                endTime: constraint?.weekendEndTime,
              }
            : null,
        };
      }),
    }));

    return NextResponse.json({
      categories: categoriesWithConstraints,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
